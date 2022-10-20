const routes = require("express").Router();
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  putUserById,
  postUser,
  patchUserById,
} = require("../controller/users");

// This routes needs to be first cause to avoid match only / with other get method
// Get User by Id or Email
routes.get("/:userId", getUserById);

// Get all Users
routes.get("/", getAllUsers);

// Create User
routes.post("/", postUser);

// Update user by Id
routes.put("/:userId", putUserById);

// Update user by Id
routes.patch("/:userId", patchUserById);

// Delete user by Id
routes.delete("/:userId", deleteUserById);

module.exports = routes;
