const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createUser } = require("../service/user");
const error = require("../utils/error");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) {
    throw error("User already exist", 400);
  }
  // Password Hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  //   find user by email
  let user = await findUserByProperty("email", email);
  if (!user) {
    throw error(" Invalid Cradential", 400);
  }
  // Password matching
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw error(" Invalid Cradential", 400);
  }

  const payLoad = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  // Token generate
  return jwt.sign(payLoad, "secret-key");
};

module.exports = { registerService, loginService };
