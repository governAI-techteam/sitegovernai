import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay key secret not configured on server' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields and formats (OWASP A08)
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
      return NextResponse.json(
        { error: 'Missing or malformed payment verification fields' },
        { status: 400 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    const generatedBuffer = Buffer.from(generated_signature, 'utf8');
    const receivedBuffer = Buffer.from(razorpay_signature, 'utf8');

    let isValid = false;
    if (generatedBuffer.length === receivedBuffer.length) {
      isValid = crypto.timingSafeEqual(generatedBuffer, receivedBuffer);
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Payment verified successfully',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Razorpay signature verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification encountered an internal error' },
      { status: 500 }
    );
  }
}
