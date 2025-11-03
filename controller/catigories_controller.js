const aflamModel = require("../models/aflam_module");

const getCategories = async (req, res) => {
  try {
    const categories = await aflamModel.distinct("genres");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories data" });
  }
};

module.exports = {
  getCategories,
};
