const userModel = require("../models/user_model");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusConstant = require("../utils/httpStatusConstant");


const createUser = asyncWrapper(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      appError(
        "Please provide all required fields",
        400,
        httpStatusConstant.ERROR
      )
    );
  }
  const { name, email, password } = req.body;
  const user = new userModel({ name, email, password });
  await user.save();
  res.status(201).json({
    status: httpStatusConstant.SUCCESS,
    message: "User created successfully",
    data: user,
  });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      appError(
        "Please provide email and password",
        400,
        httpStatusConstant.ERROR
      )
    );
  }
  const user = await userModel.findOne({ email, password });
  if (!user) {
    return next(
      appError(
        "Invalid email or password",
        401,
        httpStatusConstant.ERROR
      )
    );
  }
  res.status(200).json({
    status: httpStatusConstant.SUCCESS,
    message: "User logged in successfully",
    data: user,
  });
});

module.exports = {
  createUser,
  loginUser,
};
