const { model, Schema } = require("mongoose");

const adminAttendanceSchema = new Schema({
  timeLimit: Number,
  createAt: Date,
  status: String,
});

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = AdminAttendance;
