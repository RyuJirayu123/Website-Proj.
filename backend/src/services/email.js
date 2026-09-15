const nodemailer = require('nodemailer')

let transporter = null

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

/**
 * ส่ง email แจ้งเตือน Admin เมื่อมี Contact ใหม่
 */
async function sendContactNotification(contact) {
  if (process.env.EMAIL_ENABLED !== 'true') return

  try {
    const t = getTransporter()
    await t.sendMail({
      from: `"Apex Capital Advisory Group" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `[แจ้งเตือน] มีข้อความติดต่อใหม่จาก ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1a2332; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #c9a96e; margin: 0;">Apex Capital Advisory Group</h2>
            <p style="color: #ffffff; margin: 4px 0 0 0; font-size: 14px;">แจ้งเตือน: มีข้อความติดต่อใหม่</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 140px; color: #555;">ชื่อ</td>
                <td style="padding: 8px; color: #111;">${contact.name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">บริษัท</td>
                <td style="padding: 8px; color: #111;">${contact.company || '-'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">อีเมล</td>
                <td style="padding: 8px;"><a href="mailto:${contact.email}" style="color:#1a2332;">${contact.email}</a></td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">โทรศัพท์</td>
                <td style="padding: 8px; color: #111;">${contact.phone || '-'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">บริการที่สนใจ</td>
                <td style="padding: 8px; color: #111;">${contact.service || '-'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold; vertical-align: top; color: #555;">ข้อความ</td>
                <td style="padding: 8px; color: #111;">${(contact.message || '-').replace(/\n/g, '<br>')}</td></tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="http://localhost:5173/admin/dashboard"
               style="background: #1a2332; color: #c9a96e; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              ดู Dashboard Admin
            </a>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 24px;">
            Apex Capital Advisory Group · ส่งอัตโนมัติจากระบบเว็บไซต์
          </p>
        </div>
      `,
    })
    console.log(`📧 Email notification sent to ${process.env.NOTIFY_EMAIL}`)
  } catch (err) {
    console.error('Email send error (non-critical):', err.message)
  }
}

module.exports = { sendContactNotification }
