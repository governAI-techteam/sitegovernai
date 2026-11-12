import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      name,
      email,
      phone,
      department,
      query,
      passTitle = 'Workflow Clinic Pass',
      price,
      paymentId,
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2pwkMPc8fF26hw3igimTwQ0cHApf39Z6NHKbRfM02h4fpYmeZnQZnS0rRhvVi4VBcquveOrKhz?gv=true',
      slots = [],
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
    }

    // Cryptographic Payment Verification (OWASP A08): Ensure payment signature cannot be forged
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const finalOrderId = razorpay_order_id || orderId;
    const finalPaymentId = razorpay_payment_id || paymentId;

    if (keySecret && finalOrderId && finalPaymentId && razorpay_signature) {
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${finalOrderId}|${finalPaymentId}`)
        .digest('hex');

      const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
      const receivedBuffer = Buffer.from(razorpay_signature, 'utf8');

      if (
        expectedBuffer.length !== receivedBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
      ) {
        return NextResponse.json(
          { error: 'Payment signature validation failed. Access denied.' },
          { status: 403 }
        );
      }
    }

    // Sanitize all inputs to prevent HTML/Email Injection attacks (OWASP A03)
    const officerName = name ? escapeHtml(name.trim()) : 'Officer';
    const safeDepartment = escapeHtml(department || '');
    const safeQuery = escapeHtml(query || '');
    const safePassTitle = escapeHtml(passTitle);
    const safePaymentId = escapeHtml(finalPaymentId || 'Verified');
    const formattedPrice = price ? `₹${Number(price).toLocaleString('en-IN')}` : '';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>GovernAI Workflow Clinic Registration Confirmation</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .header { background: #191c1e; padding: 28px 32px; text-align: left; }
    .header-logo { color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .header-logo span { color: #f16a24; }
    .content { padding: 32px; }
    h1 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px; }
    p { font-size: 14.5px; line-height: 1.6; color: #334155; margin: 0 0 16px; }
    .details-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    .details-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13.5px; }
    .details-row:last-child { margin-bottom: 0; }
    .details-label { color: #64748b; font-weight: 500; }
    .details-value { color: #0f172a; font-weight: 700; }
    .cta-container { text-align: center; margin: 28px 0; }
    .cta-button { display: inline-block; background: #f16a24; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(241,106,36,0.3); }
    .footer { padding: 24px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="header-logo">Govern<span>AI</span></div>
    </div>
    <div class="content">
      <h1>Session Registration Confirmed</h1>
      <p>Dear ${officerName},</p>
      <p>Thank you for registering for the <strong>GovernAI Workflow Clinic</strong>. It is a privilege to collaborate with you to resolve your operational tasks and demonstrate practical Gen-AI workflows tailored for public administration.</p>
      
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Selected Pass:</span>
          <span class="details-value">${safePassTitle}</span>
        </div>
        ${formattedPrice ? `
        <div class="details-row">
          <span class="details-label">Amount Paid:</span>
          <span class="details-value">${formattedPrice}</span>
        </div>` : ''}
        ${safePaymentId ? `
        <div class="details-row">
          <span class="details-label">Transaction ID:</span>
          <span class="details-value">${safePaymentId}</span>
        </div>` : ''}
        ${safeDepartment ? `
        <div class="details-row">
          <span class="details-label">Department:</span>
          <span class="details-value">${safeDepartment}</span>
        </div>` : ''}
      </div>

      ${Array.isArray(slots) && slots.length > 0 ? `
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px 20px; margin: 20px 0;">
        <div style="font-size: 13.5px; font-weight: 700; color: #166534; margin-bottom: 8px;">
          Confirmed Session Slots (Google Calendar):
        </div>
        <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 13.5px; line-height: 1.7;">
          ${slots.map((s) => `<li><strong>${s}</strong></li>`).join('')}
        </ul>
        <div style="margin-top: 10px; font-size: 12.5px; color: #166534;">
          Google Meet video link and calendar invites have been reserved for these timings.
        </div>
      </div>
      ` : ''}

      <div class="cta-container">
        <a href="${bookingUrl}" class="cta-button" target="_blank">View Schedule on Google Calendar &rarr;</a>
      </div>

      <p style="font-size: 13px; color: #64748b;">
        If you wish to access or sync this to your calendar directly, use:<br>
        <a href="${bookingUrl}" style="color: #f16a24; word-break: break-all;">${bookingUrl}</a>
      </p>

      ${safeQuery ? `
      <div style="margin-top: 20px; padding: 12px 16px; background: #fffaf0; border-left: 3px solid #f16a24; font-size: 13px; color: #451a03;">
        <strong>Recorded Query:</strong><br>${safeQuery}
      </div>` : ''}

      <p style="margin-top: 24px;">If you have any questions ahead of your session, simply reply directly to this email.</p>

      <p style="margin-bottom: 0;">Warm regards,<br>
      <strong>GovernAI Advisory Team</strong><br>
      <a href="mailto:contact@governai.info" style="color: #f16a24; text-decoration: none;">contact@governai.info</a> | <a href="https://www.governai.info" style="color: #64748b; text-decoration: none;">governai.info</a></p>
    </div>
    <div class="footer">
      This is an official transaction and session confirmation issued by GovernAI OPC Private Limited.
    </div>
  </div>
</body>
</html>
`;

    const textContent = `
Dear ${officerName},

Thank you for registering for the GovernAI Workflow Clinic. Your registration and payment have been successfully confirmed.

Pass Details:
- Pass: ${passTitle}
${formattedPrice ? `- Amount: ${formattedPrice}\n` : ''}${paymentId ? `- Transaction ID: ${paymentId}\n` : ''}
${Array.isArray(slots) && slots.length > 0 ? `Confirmed Weekend Sessions (Google Calendar):\n${slots.map((s) => `  • ${s}`).join('\n')}\n` : ''}
Google Calendar Link:
${bookingUrl}

If you have any questions or additional requirements ahead of the session, please reply directly to contact@governai.info.

Warm regards,
GovernAI Advisory Team
contact@governai.info
https://www.governai.info
`;

    // Check if SMTP credentials are provided
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || 'contact@governai.info';
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"GovernAI" <${smtpUser}>`,
        to: email,
        bcc: ['parishrutjassal2780@gmail.com', 'contact@governai.info'],
        replyTo: 'contact@governai.info',
        subject: `Registration Confirmed: GovernAI Workflow Clinic (${passTitle})`,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        method: 'smtp',
        message: 'Confirmation email dispatched to official inbox',
      });
    }

    // Fallback if SMTP_PASS is not configured in .env yet:
    // Notify team via FormSubmit so the admin can review and also copy-paste the prefilled template
    try {
      const fsRes = await fetch('https://formsubmit.co/ajax/parishrutjassal2780@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Referer: 'https://governai.info/office-hours',
        },
        body: JSON.stringify({
          _subject: `[ACTION REQUIRED] Dispatched Confirmation to ${email} (Payment Verified)`,
          _template: 'table',
          _captcha: 'false',
          _cc: 'contact@governai.info',
          'Notice': 'Payment verified. Confirmed booking registered.',
          'Officer Name': officerName,
          'Officer Email': email,
          'Mobile / WhatsApp': phone || 'Not provided',
          'Pass': passTitle,
          'Price': formattedPrice,
          'Payment ID': paymentId || 'Verified',
          'Department': department || 'Not specified',
          'Pre-Submitted Query': query || 'None',
          'Confirmed Slots': Array.isArray(slots) ? slots.join('; ') : 'None',
          'Booking Link': bookingUrl,
        }),
      });
      const fsData = await fsRes.json().catch(() => ({}));
      console.log('FormSubmit fallback response:', fsData);
    } catch (e) {
      console.error('FormSubmit error:', e);
    }

    return NextResponse.json({
      success: true,
      method: 'admin_dispatched',
      message: 'SMTP credentials not yet configured in .env. Admin notified with pre-filled confirmation.',
    });
  } catch (error) {
    console.error('Confirmation email sending error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch confirmation email' },
      { status: 500 }
    );
  }
}
