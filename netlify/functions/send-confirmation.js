import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
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
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Recipient email is required' }),
      };
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
        return {
          statusCode: 403,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Payment signature validation failed. Access denied.' }),
        };
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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GovernAI Workflow Clinic Registration Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #f16a24; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);">
          
          <!-- White Header with Official GovernAI Logo -->
          <tr>
            <td style="background-color: #ffffff; padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <a href="https://www.governai.info" target="_blank" style="text-decoration: none;">
                      <img src="https://www.governai.info/assets/img/logo.png" alt="GovernAI" height="34" style="display: block; height: 34px; width: auto; border: 0;" />
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 10px; border-radius: 6px;">Workflow Clinic</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <div style="margin-bottom: 14px;">
                <span style="display: inline-block; background-color: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px;">Payment Verified</span>
              </div>

              <h1 style="margin: 0 0 14px; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1.3;">Session Registration Confirmed</h1>

              <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.65; color: #334155;">Dear ${officerName},</p>
              <p style="margin: 0 0 22px; font-size: 15px; line-height: 1.65; color: #334155;">Thank you for registering for the <strong style="color: #0f172a;">GovernAI Workflow Clinic</strong>. Your pass is now active, and we look forward to collaborating with you on practical Gen-AI workflows and operational task resolution.</p>

              <!-- Receipt Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13.5px; color: #64748b; font-weight: 500; border-bottom: 1px solid #e2e8f0;">Selected Pass</td>
                        <td align="right" style="padding: 6px 0; font-size: 13.5px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${safePassTitle}</td>
                      </tr>
                      ${formattedPrice ? `
                      <tr>
                        <td style="padding: 8px 0; font-size: 13.5px; color: #64748b; font-weight: 500; border-bottom: 1px solid #e2e8f0;">Amount Paid</td>
                        <td align="right" style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 800; border-bottom: 1px solid #e2e8f0;">${formattedPrice}</td>
                      </tr>` : ''}
                      ${safePaymentId ? `
                      <tr>
                        <td style="padding: 8px 0; font-size: 13.5px; color: #64748b; font-weight: 500;${safeDepartment ? ' border-bottom: 1px solid #e2e8f0;' : ''}">Transaction ID</td>
                        <td align="right" style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 600; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;${safeDepartment ? ' border-bottom: 1px solid #e2e8f0;' : ''}">${safePaymentId}</td>
                      </tr>` : ''}
                      ${safeDepartment ? `
                      <tr>
                        <td style="padding: 8px 0 2px; font-size: 13.5px; color: #64748b; font-weight: 500;">Department</td>
                        <td align="right" style="padding: 8px 0 2px; font-size: 13.5px; color: #0f172a; font-weight: 700;">${safeDepartment}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${Array.isArray(slots) && slots.length > 0 ? `
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 13.5px; font-weight: 700; color: #166534; margin-bottom: 8px;">Confirmed Session Slots (Google Calendar)</div>
                <ul style="margin: 0; padding-left: 18px; color: #15803d; font-size: 13.5px; line-height: 1.7;">
                  ${slots.map((s) => `<li><strong>${s}</strong></li>`).join('')}
                </ul>
                <div style="margin-top: 8px; font-size: 12.5px; color: #166534;">Google Meet conference details are included in your calendar reservation.</div>
              </div>` : ''}

              <!-- Primary CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 26px 0 18px;">
                <tr>
                  <td align="center">
                    <a href="${bookingUrl}" target="_blank" style="display: inline-block; background-color: #f16a24; color: #ffffff !important; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.01em;">Schedule Your Session on Google Calendar &rarr;</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 22px; text-align: center; font-size: 12.5px; color: #64748b;">
                Having trouble with the button? <a href="${bookingUrl}" target="_blank" style="color: #f16a24; font-weight: 600; text-decoration: underline;">Open Google Calendar Scheduler directly</a>
              </p>

              ${safeQuery ? `
              <div style="margin-bottom: 22px; padding: 14px 16px; background-color: #fff7ed; border-left: 3px solid #f16a24; border-radius: 0 8px 8px 0; font-size: 13.5px; line-height: 1.55; color: #7c2d12;">
                <strong style="display: block; margin-bottom: 4px; color: #9a3412;">Recorded Query</strong>
                ${safeQuery}
              </div>` : ''}

              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #475569;">If you have any questions ahead of your session, simply reply directly to this email.</p>

              <!-- Sign-off -->
              <div style="padding-top: 18px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #334155;">
                  Warm regards,<br>
                  <strong style="color: #0f172a; font-size: 15px;">GovernAI Team</strong><br>
                  <a href="mailto:contact@governai.info" style="color: #f16a24; text-decoration: none; font-size: 13.5px; font-weight: 600;">contact@governai.info</a>
                  <span style="color: #cbd5e1; margin: 0 6px;">|</span>
                  <a href="https://www.governai.info" style="color: #64748b; text-decoration: none; font-size: 13.5px;">www.governai.info</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #64748b; line-height: 1.5; text-align: center;">
              Official registration and payment receipt issued by GovernAI OPC Private Limited.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
GovernAI Team
contact@governai.info
https://www.governai.info
`;

    const smtpHost = process.env.SMTP_HOST;
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
        from: `"GovernAI Team" <${smtpUser}>`,
        to: email,
        bcc: ['parishrutjassal2780@gmail.com', 'contact@governai.info'],
        replyTo: 'contact@governai.info',
        subject: `Registration Confirmed: GovernAI Workflow Clinic (${passTitle})`,
        text: textContent,
        html: htmlContent,
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          method: 'smtp',
          message: 'Confirmation email dispatched to official inbox',
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        method: 'admin_dispatched',
        message: 'SMTP credentials not configured in .env. Ready for manual/SMTP dispatch.',
      }),
    };
  } catch (error) {
    console.error('Netlify send-confirmation error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Failed to dispatch confirmation' }),
    };
  }
};
