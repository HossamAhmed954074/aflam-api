const db = require("../data/db");
const validator = require("validator");

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

module.exports = db.model("User", userSchema);
