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
        res.redirect("/client/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  },
  signInForm(req, res, next) {
    res.render("client/sign_in");
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.client) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("client/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }
};
