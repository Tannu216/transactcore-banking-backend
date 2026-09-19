require('dotenv').config();
const nodemailer = require('nodemailer');

//To contant SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"transactcore-banking" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(useEmail , name){
    const subject = 'Welcome to Transactcore-Banking';
    const text = `Hello ${name},\n\nThank you for registration at Transactcore-Banking.
    We're excited to have you on board!\n\nBest regards,\nThe Transactcore-Banking Team`
   const html = `<p>Hello ${name},<p><p>Thank you for registering at Transactcore-Banking`

   await sendEmail(useEmail,subject,text,html);
  
}

async function sendTransactionEmail(userEmail, name , amount, toAccount){
  const subject = 'Transaction Successful!';
  const text = `Hello ${name},\n\nYour transaction of ${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Transactcore-Banking Team`;
  const html = `<p>Hello ${name},</p><p>Your transaction of ${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Transactcore-Banking Team</p>`;

  await sendEmail(userEmail,subject,text,html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount){
  const subject = 'Transaction Failed';
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of ${amount} to account ${toAccount} has been failed.`
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of ${amount} to account ${toAccount} has been failed.</p>`

  await sendEmail(userEmail, subject,text,html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};