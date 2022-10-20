const routes = require("express").Router();
const {
  getAttendence,
  getAttendenceStatus,
} = require("../controller/studentsAttendence");

routes.get("/status", getAttendenceStatus);
routes.get("/:id", getAttendence);

module.exports = routes;
