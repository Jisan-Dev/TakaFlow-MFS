const nodemailer = require('nodemailer');

const sendEmail = (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASS,
    },
  });

  // verify transporter | verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  const mailBody = {
    from: `TakaFlow ${process.env.TRANSPORTER_EMAIL}`,
    to: emailAddress,
    subject: emailData.subject,
    html: emailData.text,
  };

  // send mail with defined transport object
  // transporter.sendMail(mailBody, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: %s', info.messageId);
  //   }
  // });

  async function main() {
    const info = await transporter.sendMail(mailBody);
    console.log('Message sent: %s', info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendEmail;
