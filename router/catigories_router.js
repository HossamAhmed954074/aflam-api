const catigoriesController = require("../controller/catigories_controller");
const express = require("express");
const router = express.Router();





router.get("/categories", catigoriesController.getCategories);


module.exports = router;