const {
  getEnableService,
  getDisableSerivce,
  getStatusService,
} = require("../service/admin-attendence");
const AdminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");

// Attendence Enable
const getEnable = async (req, res, next) => {
  try {
    const attendence = await getEnableService();
    return res.status(200).json({ message: "success", attendence });
  } catch (e) {
    next(e);
  }
};

// Attendence Disable
const getDisable = async (req, res, next) => {
  try {
    const attendence = await getDisableSerivce();
    return res.status(200).json({ message: "success disable", attendence });
  } catch (e) {
    next(e);
  }
};

// Attendence Status
const getStatus = async (req, res, next) => {
  try {
    const running = await getStatusService();

    return res.status(200).json({ message: "Status", running });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getDisable,
  getEnable,
  getStatus,
};
