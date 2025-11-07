const aflamModel = require("../models/aflam_module");
const httpStatusConstant = require("../utils/httpStatusConstant");

const getAflam = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const aflamCount = await aflamModel.countDocuments();
    const aflam = await aflamModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({
      status: httpStatusConstant.SUCCESS,
      count: parseInt(aflamCount),
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

const getAflamByCatigory = async (req, res) => {
  const { category, limit = 20, page = 0 } = req.query;
  try {
    if (!category) {
      res.status(400).json({
        status: httpStatusConstant.ERROR,
        error: "Catigory not Found",
      });
    }
    const totalAflam = await aflamModel.countDocuments({ genres: category });
    if (totalAflam === 0) {
      return res.status(404).json({
        status: httpStatusConstant.ERROR,
        error: "No movies found for the specified category",
      });
    }
    const aflam = await aflamModel
      .find({ genres: category })
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({
      status: httpStatusConstant.SUCCESS,
      limit: parseInt(limit),
      page: parseInt(page),
      total: totalAflam,
      data: { aflam },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusConstant.ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  getAflam,
  getAflamByCatigory,
};
