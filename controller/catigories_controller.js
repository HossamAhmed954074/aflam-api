const aflamModel = require("../models/aflam_module");

const getCategories = async (req, res) => {
  try {
    const categories = await aflamModel.distinct("genres");
    res.json({
      status: "success",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories data" });
  }
};

module.exports = {
  getCategories,
};
