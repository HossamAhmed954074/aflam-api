const express = require("express");
const userController = require("../controller/user_controller");

const router = express.Router();

router.post("/users/register", userController.createUser);
router.post("/users/login", userController.loginUser);
router.delete("/users/delete", userController.deleteUser);

module.exports = router;
