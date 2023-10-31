const { CategoryModel } = require("../models/CategoryModels");

exports.getCategories = (req, res) => {
  const { name } = req.body;
  const newCategory = new CategoryModel({ name });
  newCategory
    .save()
    .then((reso) => {
      res.send(reso);
    })
    .catch((err) => {
      res.json(err);
    });
};