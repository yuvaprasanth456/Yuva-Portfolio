import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not configured.');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error: RESEND_API_KEY is not set on Vercel.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ success: false, error: 'Invalid JSON payload' });
      }
    }

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and message.',
      });
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['yuva456s@gmail.com'],
      reply_to: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #2d3748; border-radius: 12px; background-color: #0d1117; color: #f0f6fc;">
          <div style="border-bottom: 1px solid #30363d; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #58a6ff; font-weight: bold;">New Inquiry</span>
            <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 20px;">Message from ${name}</h2>
          </div>

          <div style="margin-bottom: 16px;">
            <strong style="color: #8b949e; font-size: 13px; display: block; margin-bottom: 4px;">SENDER NAME</strong>
            <span style="font-size: 15px; color: #e6edf3;">${name}</span>
          </div>

          <div style="margin-bottom: 16px;">
            <strong style="color: #8b949e; font-size: 13px; display: block; margin-bottom: 4px;">SENDER EMAIL</strong>
            <a href="mailto:${email}" style="color: #58a6ff; text-decoration: none; font-size: 15px;">${email}</a>
          </div>

          <div style="margin-bottom: 24px;">
            <strong style="color: #8b949e; font-size: 13px; display: block; margin-bottom: 8px;">MESSAGE</strong>
            <div style="background-color: #161b22; border: 1px solid #30363d; padding: 16px; border-radius: 8px; color: #e6edf3; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="border-top: 1px solid #30363d; padding-top: 16px; font-size: 12px; color: #8b949e; text-align: center;">
            This email was sent from your portfolio contact form (<a href="https://yuvaprasanthportfolio.vercel.app" style="color: #58a6ff; text-decoration: none;">yuvaprasanthportfolio.vercel.app</a>). You can directly hit <strong>Reply</strong> to email ${name}.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ success: false, error: error.message || 'Failed to send message via Resend.' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Internal server error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'An unexpected error occurred while processing your request.',
    });
  }
}
