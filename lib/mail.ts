import nodemailer from "nodemailer";

/**
 * LUXE HEELS Email Utility
 * Note: For production, configure SMTP settings in .env
 */

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (email: string, orderDetails: any) => {
  try {
    const mailOptions = {
      from: '"LUXE HEELS" <no-reply@luxeheels.com>',
      to: email,
      subject: `Order Confirmation - #${orderDetails._id.slice(-6)}`,
      html: `
        <div style="font-family: serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f8f5f0;">
          <h1 style="text-align: center; color: #1a1a1a;">LUXE HEELS</h1>
          <p style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">Thank you for your order</p>
          <hr style="border: 0; border-top: 1px solid #f8f5f0; margin: 20px 0;">
          <p>Dear Customer,</p>
          <p>We are delighted to confirm that your order for our handcrafted collection has been received.</p>
          <div style="background-color: #f8f5f0; padding: 15px; margin: 20px 0;">
             <p><strong>Order ID:</strong> #${orderDetails._id}</p>
             <p><strong>Total Amount:</strong> $${orderDetails.totalPrice.toLocaleString()}</p>
          </div>
          <p>Our artisans are now preparing your pieces for shipment.</p>
          <p style="margin-top: 40px; font-size: 12px; color: #666;">&copy; 2026 LUXE HEELS. All rights reserved.</p>
        </div>
      `,
    };

    // For now, we just log it unless SMTP is configured
    console.log(`[MAIL] Sending order confirmation to ${email}`);
    // await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
