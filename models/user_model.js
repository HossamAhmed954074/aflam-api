const db = require("../data/db");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new db.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.method("genAuthToken", function () {
  const token = jwt.sign(
    { id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
});

module.exports = db.model("User", userSchema);
