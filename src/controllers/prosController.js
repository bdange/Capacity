module.exports = {
  index(req, res, next) {
    res.render("pros/index", { title: "A flight to offer?" });
  }
};
