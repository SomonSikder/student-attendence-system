const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const re = /\S+@\S+\.\S+/;
        return re.test(v);
      },
      message: (props) => `Invalid Email: ${props.value}`,
    },
  },
  password: {
    type: String,
    minLength: [5, "Password is too short"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["Student"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
