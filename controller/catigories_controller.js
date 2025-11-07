const aflamModel = require("../models/aflam_module");
const httpStatusConstant = require("../utils/httpStatusConstant");

const getCategories = async (req, res) => {
  try {
    const categories = await aflamModel.distinct("genres");
    res.json({
      status: httpStatusConstant.SUCCESS,
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatusConstant.error,
      error: error.message,
    });
  }
};



module.exports = {
  getCategories,
 
};
