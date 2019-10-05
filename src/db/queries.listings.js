const Listing = require("./models").Listings;

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
        console.log(newListing);
        callback(null, listing);
      })
      .catch(err => {
        callback(err);
      });
  },
  getListing(id, callback) {
    return Listing.findByPk(id)
      .then(listing => {
        callback(null, listing);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteListing(id, callback) {
    return Listing.destroy({
      where: { id }
    })
      .then(listing => {
        callback(null, listing);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateListing(id, updatedListing, callback) {
    return Listing.findByPk(id).then(listing => {
      if (!listing) {
        return callback("Listing not found");
      }
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
    });
  }
};
