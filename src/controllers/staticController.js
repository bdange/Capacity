module.exports = {
  index(req, res, next) {
    res.render("static/index", { title: "Welcome to Capacity" });
  },

  informations(req, res, next) {
    res.render("static/informations", { title: "Informations" });
  }
};
