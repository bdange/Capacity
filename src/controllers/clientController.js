const clientQueries = require("../db/queries.client.js");
const passport = require("passport");

module.exports = {
  index(req, res, next) {
    res.render("client/index", { title: "Special request" });
  },
  signUp(req, res, next) {
    res.render("client/sign_up");
  },
  create(req, res, next) {
    let newClient = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    clientQueries.createClient(newClient, (err, client) => {
      if (err) {
        req.flash("error", err);
        res.redirect("client/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  }
};
