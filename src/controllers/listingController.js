const dotenv = require("dotenv").config();

const listingQueries = require("../db/queries.listings.js");
// const multer = require("multer");
// const upload = multer({ dest: "../assets/uploads/" });
const Authorizer = require("../policies/listings");
const nodemailer = require("nodemailer");
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

module.exports = {
  index(req, res, next) {
    listingQueries.getAllListings((err, listings) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("listings/index", { listings });
      }
    });
  },
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();
    if (authorized) {
      res.render("listings/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/listings/index");
    }
  },
  // create(req, res, next) {
  //   console.log(req);
  //   let body = JSON.parse(JSON.stringify(req.body));
  //   /*console.log(req.files);
  //   res.json(req.files);
  //   return; */
  //   const authorized = new Authorizer(req.user).create();
  //   if (authorized) {
  //     let newListing = {
  //       image1: req.files[0].filename,
  //       image2: req.files[1].filename,
  //       date: body.date,
  //       aircraft: body.aircraft,
  //       seats: body.seats,
  //       origin: body.origin,
  //       destination: body.destination,
  //       currency: body.currency,
  //       price: body.price
  //     };
  //     //console.log(newListing);
  //     listingQueries.addListing(newListing, (err, listing) => {
  //       //console.log(body);
  //       //console.log(req);
  //       if (err) {
  //         //console.log(err);
  //         res.redirect(500, "/listings/new");
  //       } else {
  //         res.redirect(302, `/listings/${listing.id}`);
  //       }
  //     });
  //   } else {
  //     req.flash("notice", "You are not authorized to do that.");
  //     res.redirect("/listings/index");
  //   }
  // },
  show(req, res, next) {
    listingQueries.getListing(req.params.id, (err, listing) => {
      if (err || listing == null) {
        res.redirect(404, "/");
      } else {
        res.render("listings/show", { listing });
      }
    });
  },
  destroy(req, res, next) {
    listingQueries.deleteListing(req.params.id, (err, listing) => {
      if (err) {
        res.redirect(500, `/listings/${listing.id}`);
      } else {
        res.redirect(302, "/listings/index");
      }
    });
  },
  // edit(req, res, next) {
  //   listingQueries.getListing(req.params.id, (err, listing) => {
  //     if (err || listing == null) {
  //       res.redirect(404, "/");
  //     } else {
  //       const authorized = new Authorizer(req.user, listings).edit();
  //       if (authorized) {
  //         res.render("listings/edit", { listing });
  //       } else {
  //         req.flash("You are not authorized to do that.");
  //         res.redirect(`/listings/${req.params.id}`);
  //       }
  //     }
  //   });
  // },
  // update(req, res, next) {
  //   listingQueries.updateListing(req.params.id, req.body, (err, listing) => {
  //     if (err || listing == null) {
  //       res.redirect(404, `/listings/${req.params.id}/edit`);
  //     } else {
  //       res.redirect(`/listings/${listing.id}`);
  //     }
  //   });
  // },
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
      subject: "New request from contact form at flycapacity.com",
      text: `${req.body.name} ${req.body.email} ${req.body.phone} says: ${req.body.message}`
    };

    try {
      smtpTrans.sendMail(mailOpts, (err, res) => {
        if (err) {
          throw err;
        }
      });
      req.flash("notice", "Your message has been sent!");
      res.redirect(`/listings/${listing.id}`);
    } catch (err) {
      console.log(err);
      req.flash("error", err);
      res.redirect(`/listings/${listing.id}`);
    }
  }
};
