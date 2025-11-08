const userModel = require("../models/user_model");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusConstant = require("../utils/httpStatusConstant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = asyncWrapper(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      appError.create(
        "Please provide all required fields",
        400,
        httpStatusConstant.ERROR
      )
    );
  }
  const { name, email, password } = req.body;
  // check if user already exists
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return next(
      appError.create(
        "User with this email already exists",
        409,
        httpStatusConstant.ERROR
      )
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new userModel({ name, email, password: hashedPassword });
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
      appError.create(
        "Please provide email and password",
        400,
        httpStatusConstant.ERROR
      )
    );
  }
  // dont show password field
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return next(
      appError.create(
        "Invalid email or password",
        401,
        httpStatusConstant.ERROR
      )
    );
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(
      appError.create(
        "Invalid email or password",
        401,
        httpStatusConstant.ERROR
      )
    );
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(200).json({
    status: httpStatusConstant.SUCCESS,
    message: "User logged in successfully",
    token: token,
  });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const accessToken = req.query.accessToken;
  if (!accessToken) {
    return next(
      appError.create("Access token is required", 400, httpStatusConstant.ERROR)
    );
  }

  const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
  if (!decoded) {
    return next(
      appError.create("Invalid access token", 401, httpStatusConstant.ERROR)
    );
  }

  const userId = decoded.id;
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    return next(
      appError.create("User not found", 404, httpStatusConstant.ERROR)
    );
  }
  res.status(200).json({
    status: httpStatusConstant.SUCCESS,
    message: "User deleted successfully",
  });
});
module.exports = {
  createUser,
  loginUser,
  deleteUser,
};
