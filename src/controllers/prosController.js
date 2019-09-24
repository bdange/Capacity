const proQueries = require("../db/queries.pros.js");
const passport = require("passport");

module.exports = {
  index(req, res, next) {
    res.render("pros/index", { title: "A flight to offer?" });
  },
  signUp(req, res, next) {
    res.render("pros/sign_up");
  },
  create(req, res, next) {
    let newPro = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    proQueries.createPro(newPro, (err, pro) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/pros/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  },
  signInForm(req, res, next) {
    res.render("pros/sign_in");
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.pro) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/pros/sign_in");
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
