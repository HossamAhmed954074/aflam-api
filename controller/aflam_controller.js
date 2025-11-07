const aflamModel = require("../models/aflam_module");
const httpStatusConstant = require("../utils/httpStatusConstant");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAflam = asyncWrapper(async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;

  if (page <= 0 || limit <= 0) {
   return next(appError.create("Page and limit must be positive integers", 400, httpStatusConstant.FAIL));
   
  }
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
});

const getAflamByCatigory = asyncWrapper(async (req, res, next) => {
  const { category, limit = 20, page = 1 } = req.query;
  if (page <= 0 || limit <= 0) {
    return next(appError.create("Page and limit must be positive integers", 400, httpStatusConstant.FAIL));
  }
  if (!category) {
    return next(appError.create("Category query parameter is required", 400, httpStatusConstant.FAIL));
  }
  const totalAflam = await aflamModel.countDocuments({ genres: category });
  if (totalAflam === 0) {
    return next(appError.create(`No films found for category: ${category}`, 404, httpStatusConstant.FAIL));
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
});

module.exports = {
  getAflam,
  getAflamByCatigory,
};
