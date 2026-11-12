import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay API credentials not configured on server' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
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
      return NextResponse.json(
        { error: 'Invalid order amount or unrecognized pass identifier' },
        { status: 400 }
      );
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

    const options = {
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: receipt ? String(receipt).slice(0, 40) : `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: sanitizedNotes,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        id: order.id,
        receipt: order.receipt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Razorpay order creation error:', error);

    if (error.statusCode === 401 || error.status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed with payment gateway' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
