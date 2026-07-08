import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to map sport ID to labels
const getSportDetails = (id: string) => {
  const sports: Record<string, { en: string; mk: string; color: string }> = {
    basketball: { en: '3x3 Basketball', mk: '3x3 Баскет', color: '#ff6b00' },
    soccer: { en: 'Futsal (Soccer)', mk: 'Мал Фудбал (Futsal)', color: '#10b981' },
    tennis: { en: 'Tennis', mk: 'Тенис', color: '#84cc16' },
    handball: { en: 'Handball', mk: 'Ракомет', color: '#ef4444' },
    volleyball: { en: 'Beach Volleyball', mk: 'Одбојка на песок', color: '#38bdf8' },
    pingpong: { en: 'Table Tennis (Ping Pong)', mk: 'Пинг Понг', color: '#facc15' },
  };
  return sports[id] || { en: id, mk: id, color: '#ff6b00' };
};

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: Register Team / Player
app.post('/api/register', async (req, res) => {
  try {
    const { id, teamName, captainName, email, phone, sportId, roster, timestamp } = req.body;

    if (!teamName || !captainName || !email || !phone || !sportId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const sport = getSportDetails(sportId);
    const recipient = process.env.RECIPIENT_EMAIL || 'streetballvalandovo@gmail.com';

    // Build Email Bodies
    const emailSubject = `[Tournament Registration] ${sport.en} - ${teamName}`;
    const playersListHtml = roster && roster.length > 0
      ? roster.map((player: string, index: number) => `
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: 600; color: #1f2937;">Player #${index + 1}</td>
            <td style="padding: 10px 0; color: #4b5563;">${player}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="2" style="padding: 10px 0; color: #9ca3af; text-align: center;">No additional players registered</td></tr>';

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Registration</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: ${sport.color}; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">New Registration Received</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">Discipline: ${sport.en} (${sport.mk})</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 30px; background-color: #ffffff;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <h2 style="color: #111827; font-size: 18px; margin-top: 0; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">General Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.5;">
                      <tr>
                        <td width="35%" style="color: #6b7280; font-weight: 600; padding: 6px 0;">Registration ID:</td>
                        <td width="65%" style="color: #111827; font-weight: 700; font-family: monospace; font-size: 13px;">${id || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-weight: 600; padding: 6px 0;">Team/Player Name:</td>
                        <td style="color: #111827; font-weight: 700; font-size: 15px;">${teamName}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-weight: 600; padding: 6px 0;">Captain/Contact Name:</td>
                        <td style="color: #111827; font-weight: 600;">${captainName}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-weight: 600; padding: 6px 0;">Contact Email:</td>
                        <td style="color: #111827;"><a href="mailto:${email}" style="color: ${sport.color}; text-decoration: none; font-weight: 600;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-weight: 600; padding: 6px 0;">Contact Phone:</td>
                        <td style="color: #111827; font-weight: 600;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-weight: 600; padding: 6px 0;">Registered On:</td>
                        <td style="color: #111827;">${timestamp || new Date().toLocaleDateString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Roster Section -->
                <tr>
                  <td>
                    <h2 style="color: #111827; font-size: 18px; margin-top: 15px; margin-bottom: 15px; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Registered Roster (Players)</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 25px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px;">
                      ${playersListHtml}
                    </table>
                  </td>
                </tr>

                <!-- CTA Actions -->
                <tr>
                  <td style="text-align: center; padding-top: 10px; border-top: 1px dashed #e4e4e7;">
                    <p style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">You can reply directly to this email to contact the registered team captain.</p>
                    <a href="mailto:${email}" style="display: inline-block; background-color: ${sport.color}; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
                      Reply to Captain
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0 0 4px 0;">This email was automatically generated by the Streetball Valandovo Tournament Portal.</p>
              <p style="margin: 0;">© 2026 Streetball Valandovo. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textBody = `
      NEW TOURNAMENT REGISTRATION RECEIVED
      ===================================
      Discipline: ${sport.en} (${sport.mk})
      Registration ID: ${id || 'N/A'}
      
      Team/Player Name: ${teamName}
      Captain Name: ${captainName}
      Email: ${email}
      Phone: ${phone}
      Date: ${timestamp || new Date().toLocaleDateString()}
      
      ROSTER:
      ${roster && roster.length > 0 ? roster.map((p: string, i: number) => ` - Player ${i+1}: ${p}`).join('\n') : 'No additional players.'}
    `;

    // SMTP Credentials Check (Lazy Initialization)
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP credentials not set. Email not sent. Running in simulation mode.');
      return res.json({
        success: true,
        smtpConfigured: false,
        message: 'Registration successful! (Demo Mode: SMTP parameters are not configured, so email transmission is simulated)',
        data: { id, teamName, sportId }
      });
    }

    // Configure Mailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use SSL for 465, STARTTLS for 587/25
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: `"${sport.en} Registration" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody
    });

    console.log(`✉️ Successful registration email sent for team ${teamName} to ${recipient}`);

    return res.json({
      success: true,
      smtpConfigured: true,
      message: 'Registration details sent successfully to streetballvalandovo@gmail.com!'
    });

  } catch (error: any) {
    console.error('❌ Failed to process registration email:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred during registration transmission.'
    });
  }
});

// Vite middleware setup for Development, Static assets for Production
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack dev server listening at http://localhost:${PORT}`);
  });
}

bootstrap();
