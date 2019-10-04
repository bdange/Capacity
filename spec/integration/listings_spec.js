const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/listings/";
const sequelize = require("../../src/db/models/index").sequelize;
const Listing = require("../../src/db/models").Listings;

describe("routes : listings", () => {
  beforeEach(done => {
    this.listings;
    sequelize.sync({ force: true }).then(res => {
      Listing.create({
        title: "New York to Paris",
        description: "Only tonight"
      })
        .then(listing => {
          this.listings = listing;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("GET /listings", () => {
    it("should return a status code 200 and all the listings", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Listings");
        expect(body).toContain("New York to Paris");
        done();
      });
    });
  });
});
