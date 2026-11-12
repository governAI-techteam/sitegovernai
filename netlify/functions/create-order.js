import Razorpay from 'razorpay';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Razorpay API credentials not configured on server' }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { pass_id, amount, currency = 'INR', receipt, notes } = body;

    // Authoritative pricing catalog to prevent client-side price tampering (OWASP A04)
    const AUTHORITATIVE_PASS_PRICES = {
      monthly: 199900,   // ₹1,999
      quarterly: 599900, // ₹5,999
    };

    const targetPassId = pass_id || (notes && notes.pass_id);
    let amountInPaise;

    if (targetPassId && AUTHORITATIVE_PASS_PRICES[targetPassId]) {
      // Enforce server-side authoritative price
      amountInPaise = AUTHORITATIVE_PASS_PRICES[targetPassId];
    } else if (amount && Number(amount) >= 100) {
      amountInPaise = Math.round(Number(amount));
    } else {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid order amount or unrecognized pass identifier' }),
      };
    }

    const sanitizedNotes = {};
    if (notes && typeof notes === 'object') {
      for (const [k, v] of Object.entries(notes)) {
        if (typeof v === 'string') {
          sanitizedNotes[k.slice(0, 40)] = v.slice(0, 250);
        }
      }
    }
    if (targetPassId) {
      sanitizedNotes.pass_id = targetPassId;
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: receipt ? String(receipt).slice(0, 40) : `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: sanitizedNotes,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        id: order.id,
        receipt: order.receipt,
        key_id: keyId,
      }),
    };
  } catch (error) {
    console.error('Netlify function create-order error:', error);
    return {
      statusCode: error.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Failed to create Razorpay order' }),
    };
  }
};
