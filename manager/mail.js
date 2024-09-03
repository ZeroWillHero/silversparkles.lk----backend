const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, data) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.NM_AUTH_USER,
      pass: process.env.EMAIL_SEND_API_KEY,
    },
  });

  if (subject === "Register") {
    subject = "Gold House Email Verification";
    html = `
    <html>
    <head>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; text-align: center;">
    <h1>Email Verification</h1>
    <p>Thank you for registering. Please click the button below to verify your email address.</p>
    <a href="${data}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Verify Email</a>
    <p>If the button above does not work, please click the link below or copy and paste it into your browser:</p>
    <a href="${data}">${data}</a>
  </div>
  </body>
  </html>
  `;
  } else if (subject === "Resetpw") {
    subject = "Gold House Password Reset";
    html = `
    <html>
    <head>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; text-align: center;">
    <h1>Password Reset</h1>
    <p>Click the button below to reset your password.</p>
    <a href="${data}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Reset Password</a>
    <p>If the button above does not work, please click the link below or copy and paste it into your browser:</p>
    <a href="${data}">${data}</a>
  </div>
  </body>
  </html>
  `;
  } else if (subject === "Order") {
    subject = "Gold House Order Confirmation";
    const productsHTML = data.products.map(product => `
        <p><strong>Product:</strong> ${product.title}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Total Price:</strong> ${product.totalPrice}</p>
        <hr>
    `).join('');

    html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333333;">Order Confirmation</h2>
            ${productsHTML}
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Total Order Price:</strong> ${data.totalOrderPrice}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <hr>
            <p style="color: #666666;">Thank you for your order!</p>
            <p style="color: #666666;">If you have any questions, please contact our support team.</p>
        </div>
    </body>
    </html>
    `;
  } else if (subject === "Register-Admin-Verify") {
    subject = "Gold House Admin Verification";
    html = `
    <html>
    <head>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; text-align: center;">
    <h1>Email Verification</h1>
    <p>Thank you for registering. Please click the button below to verify your email address.</p>
    <a href="${data}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Verify Email</a>
    <p>If the button above does not work, please click the link below or copy and paste it into your browser:</p>
    <a href="${data}">${data}</a>
  </div>
  </body>
  </html>
  `;
  }

  if (subject === "Gold House Order Confirmation") {
    await transporter
      .sendMail({
        to: to,
        bcc: process.env.ADMIN_EMAIL,
        from: process.env.NM_AUTH_USER,
        html: html,
        subject: subject,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });

  } else {
    await transporter
      .sendMail({
        to: to,
        from: process.env.NM_AUTH_USER,
        html: html,
        subject: subject,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }


};

module.exports = sendMail;
