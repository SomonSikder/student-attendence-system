const routes = require("express").Router();
const auth = require("./auth");
const users = require("./users");
const adminAttendance = require("./admin-attendence");
const studentsAttendance = require("./students-attendence");
const authenticate = require("../middleware/authenticate");

routes.use("/api/auth", auth);
routes.use("/api/users", authenticate, users);
routes.use("/api/admin/attendence", authenticate, adminAttendance);
routes.use("/api/students/attendence", authenticate, studentsAttendance);

module.exports = routes;
