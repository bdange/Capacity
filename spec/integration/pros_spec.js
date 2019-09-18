const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/pros/";

describe("routes: pros", () => {
  describe("GET /pros", () => {
    it("should render an info view", done => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        done();
      });
    });
  });
});
