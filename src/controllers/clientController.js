const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

module.exports = {
  index(req, res, next) {
    res.render("client/index", { title: "Special request" });
  },
  sendForm(req, res, next) {
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
      text: `(${req.body.name} ${req.body.email} ${req.body.phone}) says: ${req.body.message}`
    };

    smtpTrans.sendMail(mailOpts, (err, response) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/client");
      } else {
        res.flash("notice", "Your message has been sent!");
        res.redirect("/client");
      }
    });
  }
};
