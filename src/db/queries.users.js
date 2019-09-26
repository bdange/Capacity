const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
      .then(user => {
        const msg = {
          to: newUser.email,
          from: "admin@flycapacity.com",
          subject: "Signup succeeded!",
          html: "<h1>You've successfully signed-up!</h1>"
        };

        console.log(process.env.SENDGRID_API_KEY);
        sgMail.send(msg);
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  }
};
