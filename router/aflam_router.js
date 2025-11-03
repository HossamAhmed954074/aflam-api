const express = require("express");

const router = express.Router();
const { getAflam } = require("../controller/aflam_controller");

router.get("/aflam", getAflam);

module.exports = router;