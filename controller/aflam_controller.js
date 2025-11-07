const aflamModel = require("../models/aflam_module");
const httpStatusConstant = require("../utils/httpStatusConstant");

const getAflam = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const aflam = await aflamModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({
      status: httpStatusConstant.SUCCESS,
      page: parseInt(page),
      limit: parseInt(limit),
      data: { aflam },
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatusConstant.ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  getAflam,
};
