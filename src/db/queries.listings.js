const Listing = require("./models").Listings;
const Authorizer = require("../policies/listings");

module.exports = {
  getAllListings(callback) {
    return Listing.findAll()
      .then(listings => {
        callback(null, listings);
      })
      .catch(err => {
        callback(err);
      });
  },
  addListing(newListing, callback) {
    return Listing.create({
      image1: newListing.image1,
      image2: newListing.image2,
      date: newListing.date,
      aircraft: newListing.aircraft,
      seats: newListing.seats,
      origin: newListing.origin,
      destination: newListing.destination,
      currency: newListing.currency,
      price: newListing.price
    })
      .then(listing => {
        callback(null, listing);
      })
      .catch(err => {
        callback(err);
      });
  },
  getListing(id, callback) {
    console.log("XX id", id);
    return Listing.findByPk(id)
      .then(listing => {
        console.log("Listing found", listing);
        callback(null, listing);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteListing(id, callback) {
    return Listing.findByPk(req.params.id)
      .then(listing => {
        const authorized = new Authorizer(req.user, listing).destroy();
        if (authorized) {
          listing.destroy().then(res => {
            callback(null, listing);
          });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },
  updateListing(id, updatedListing, callback) {
    return Listing.findByPk(req.params.id).then(listing => {
      if (!listing) {
        return callback("Listing not found");
      }
      const authorized = new Authorizer(req.user, listing).update();
      if (authorized) {
        listing
          .update(updatedListing, {
            fields: Object.keys(updatedListing)
          })
          .then(() => {
            callback(null, listing);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  }
};
