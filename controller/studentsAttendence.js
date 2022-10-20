const StudentAttendance = require("../models/StudentsAttendent");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const {
  getAttendenceService,
  getAttendenceStatusService,
} = require("../service/students-attendence");

const getAttendence = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendence = await AdminAttendance.findById(id);

    if (!adminAttendence) {
      throw error("Invalid ID", 400);
    }

    if (adminAttendence.status === "COMPLETE") {
      throw error("Attendence already completed", 400);
    }

    let attendence = await StudentAttendance.findOne({
      user: req.user._id,
      adminAttendance: id,
    });
    if (attendence) {
      throw error("Already Attend");
    }
    attendence = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendence.save();
    return res.status(201).json(attendence);
  } catch (e) {
    next(e);
  }
};

const getAttendenceStatus = async (req, res, next) => {
  try {
    const running = await getAttendenceStatusService();

    return res.status(200).json({ message: "Status", running });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAttendence, getAttendenceStatus };
