const routes = require("express").Router();
const auth = require("./auth");
const users = require("./users");
const authenticate = require("../middleware/authenticate");

routes.use("/api/auth", auth);
routes.use("/api/users", authenticate, users);

module.exports = routes;
