const aflamModel = require("../models/aflam_module");

const getAflam = async (req, res) => {
  try {
    const aflam = await aflamModel.find();
    res.json(aflam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching aflam data" });
  }
};

module.exports = {
  getAflam,
};
