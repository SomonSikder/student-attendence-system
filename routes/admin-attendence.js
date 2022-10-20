const routes = require("express").Router();
const {
  getEnable,
  getDisable,
  getStatus,
} = require("../controller/adminAttendence");

routes.get("/enable", getEnable);
routes.get("/disable", getDisable);
routes.get("/status", getStatus);

module.exports = routes;
