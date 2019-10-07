const listingQueries = require("../db/queries.listings.js");
const multer = require("multer");
const upload = multer({ dest: "../assets/uploads/" });

module.exports = {
  index(req, res, next) {
    listingQueries.getAllListings((err, listings) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("listings/new", { listings });
      }
    });
  },
  new(req, res, next) {
    res.render("listings/new");
  },
  create(req, res, next) {
    //console.log(req);
    let body = JSON.parse(JSON.stringify(req.body));
    let newListing = {
      image1: req.files[0],
      image2: req.files[1],
      date: body.date,
      aircraft: body.aircraft,
      seats: body.seats,
      origin: body.origin,
      destination: body.destination,
      currency: body.currency,
      price: body.price
    };
    //console.log(newListing);
    listingQueries.addListing(newListing, (err, listing) => {
      //console.log(body);
      //console.log(req);
      if (err) {
        console.log(err);
        res.redirect(500, "/listings/new");
      } else {
        res.redirect(302, `/listings/${listing.id}`);
      }
    });
  },
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
        res.redirect(300, "/listings");
      }
    });
  },
  edit(req, res, next) {
    listingQueries.getListing(req.params.id, (err, listing) => {
      if (err || listing == null) {
        res.redirect(404, "/");
      } else {
        res.render("listings/edit", { listing });
      }
    });
  },
  update(req, res, next) {
    listingQueries.updateListing(req.params.id, req.body, (err, listing) => {
      if (err || listing == null) {
        res.redirect(404, `/listings/${req.params.id}/edit`);
      } else {
        res.redirect(`/listings/${listing.id}`);
      }
    });
  }
};
