const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const nodemailer = require("nodemailer");

module.exports = {
  index(req, res, next) {
    res.render("pros/index", { title: "A flight to offer?" });
  },
  nodemailer(req, res, next) {
    router.post("/pros/contact", (req, res) => {
      const smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOpts = {
        from: "Your sender info here", // This is ignored by Gmail
        to: GMAIL_USER,
        subject: "New message from contact form at Capacity",
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
      };

      // Attempt to send the email
      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          res.render("contact-failure"); // Show a page indicating failure
        } else {
          res.render("contact-success"); // Show a page indicating success
        }
      });
    });
    res.render("pros/index");
  }
};
