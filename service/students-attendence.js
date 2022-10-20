const StudentsAttendence = require("../models/StudentsAttendent");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getAttendenceService = async (req, res, next) => {
  // const attendence = await AdminAttendance.findById()
};

const getAttendenceStatusService = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (!running) {
    throw error("Not Running", 400);
  }
  const startedAt = await addMinutes(
    new Date(running.createdDate),
    running.timeLimit
  );
  const distance = isAfter(new Date(), startedAt);
  if (distance) {
    running.status = "COMPLETE";
    await running.save();
  }
  return running;
};

module.exports = { getAttendenceService, getAttendenceStatusService };
