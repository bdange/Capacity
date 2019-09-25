module.exports = {
  index(req, res, next) {
    res.render("client/index", { title: "Special request" });
  }
};
