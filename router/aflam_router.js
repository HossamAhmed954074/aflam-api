const express = require("express");

const router = express.Router();
const aflamController = require("../controller/aflam_controller");

router.get("/aflam", aflamController.getAflam);
router.get("/byCatigory",aflamController.getAflamByCatigory);

module.exports = router;