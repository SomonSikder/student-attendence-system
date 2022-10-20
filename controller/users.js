const {
  findUsers,
  findUserByProperty,
  createUser,
  updateUser,
} = require("../service/user");
const error = require("../utils/error");
const { registerService } = require("../service/auth");
const User = require("../models/UserModle");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    if (!user) {
      throw error("Something went wrong");
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;
  try {
    const user = await updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const patchUserById = async (req, res, next) => {
  const id = req.params.userId;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", id);
    if (!user) {
      throw error("User not found", 404);
    }
    console.log(user);
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(202).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findById({ _id: id });
    await user.remove();
    return res.status(202).json("User deleted");
  } catch (e) {
    next(e);
  }

  return res.status(200).json("deleted");
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  putUserById,
  postUser,
  patchUserById,
};
