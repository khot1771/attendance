const asyncHandler = require("express-async-handler");
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.getBatch = asyncHandler(async (req, res) => {
  const result = await Batch.find();
  res.status(200).json({ message: "Batch Fetch Success", result });
});
exports.addBatch = asyncHandler(async (req, res) => {
  await Batch.create(req.body);
  res.status(201).json({ message: "Batch Add Success" });
});
exports.updateBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  await Batch.findByIdAndUpdate(batchId, req.body, { runValidators: true });
  res.status(200).json({ message: "Batch Update Success" });
});
exports.deleteBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  await Batch.findByIdAndDelete(batchId);
  res.status(200).json({ message: "Batch Delete Success" });
});

exports.getStudent = asyncHandler(async (req, res) => {
  const result = await Student.find();
  res.status(200).json({ message: "Student Fetch Success", result });
});
exports.getStudentsByBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  const result = await Student.find({ batchId });
  res.status(200).json({ message: "Batch Wise Student Fetch Success", result });
});
exports.addStudent = asyncHandler(async (req, res) => {
  await Student.create(req.body);
  res.status(201).json({ message: "Student Add Success" });
});
exports.updateStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  await Student.findByIdAndUpdate(studentId, req.body, { runValidators: true });
  res.status(200).json({ message: "student Update Success" });
});
exports.deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  await Student.findByIdAndDelete(studentId);
  res.status(200).json({ message: "Student Delete Success" });
});

exports.getAttendance = asyncHandler(async (req, res) => {
  const { studId } = req.params;
  const result = await Attendance.find({ studId });
  res.status(200).json({ message: "Attandance Fetch Success", result });
});
exports.addAttendance = asyncHandler(async (req, res) => {
  const x = req.body.map((item) => {
    return { studId: item.studId, date: item.date, isPresent: item.isPresent };
  });
  const result = await Attendance.findOne({
    studId: x[0].studId,
    date: x[0].date,
  });
  if (result) {
    return res.status(400).json({ message: "Duplicate Attandance " });
  }
  await Attendance.create(x);
  res.status(201).json({ message: "Attandance Add Success" });
});
exports.updateAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;
  await Attendance.findByIdAndUpdate(attendanceId, req.body, {
    runValidators: true,
  });
  res.status(200).json({ message: "Attendance Update Success" });
});
exports.deleteAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;
  await Attendance.deleteMany();
  res.status(200).json({ message: "Attandance Delete Success" });
});
