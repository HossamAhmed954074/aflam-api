const aflamModel = require("../models/aflam_module");

const getAflam = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const aflam = await aflamModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({
      status: "success",
      page: parseInt(page),
      limit: parseInt(limit),
      data: aflam,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching aflam data" });
  }
};

module.exports = {
  getAflam,
};
