const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getEnableService = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (running) {
    throw error("Already running", 400);
  }
  const attendence = new AdminAttendance({});
  return attendence.save();
};

const getStatusService = async () => {
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

const getDisableSerivce = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (!running) {
    throw error("Not Rounning", 404);
  }
  running.status = "COMPLETE";
  await running.save();
  return running;
};

module.exports = { getEnableService, getDisableSerivce, getStatusService };
