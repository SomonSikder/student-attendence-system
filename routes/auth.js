const routes = require("express").Router();
const { registerController, loginController } = require("../controller/auth");

routes.post("/register", registerController);
routes.post("/login", loginController);

module.exports = routes;
