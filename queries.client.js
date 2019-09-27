const nodemailer = require("nodemailer");

module.exports = {
  sendForm(message, callback) {
    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    });

    const mailOpts = {
      from: "admin@flycapacity.com",
      to: GMAIL_USER,
      subject: "New message from contact form at flycapacity.com",
      text: `(${req.body.email} ${req.body.phone}) says: ${req.body.message}`
    };
  }
};
