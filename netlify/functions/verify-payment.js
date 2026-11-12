import crypto from 'node:crypto';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Razorpay key secret not configured on server' }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      typeof razorpay_order_id !== 'string' ||
      typeof razorpay_payment_id !== 'string' ||
      typeof razorpay_signature !== 'string' ||
      !razorpay_order_id.startsWith('order_') ||
      !razorpay_payment_id.startsWith('pay_')
    ) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing or malformed payment verification fields' }),
      };
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    const generatedBuffer = Buffer.from(generated_signature, 'utf8');
    const receivedBuffer = Buffer.from(razorpay_signature, 'utf8');

    let isValid = false;
    if (generatedBuffer.length === receivedBuffer.length) {
      isValid = crypto.timingSafeEqual(generatedBuffer, receivedBuffer);
    }

    if (!isValid) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid payment signature. Verification failed.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'success',
        message: 'Payment verified successfully',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      }),
    };
  } catch (error) {
    console.error('Netlify function verify-payment error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Payment verification encountered an internal error' }),
    };
  }
};
