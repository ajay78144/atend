// ==========================================
// 📁 routes/attendanceRoutes.js
// 🎯 Kaam: Attendance API Endpoints (POST, GET, PUT, DELETE)
// ==========================================

const express = require('express');
const router = express.Router();

const {
    postAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} = require('../controllers/attendanceController');

// 1. POST (Add Attendance) & GET (All Attendance)
router.route('/')
    .post(postAttendance)   // POST http://localhost:5000/api/attendance
    .get(getAttendance);    // GET  http://localhost:5000/api/attendance

// 2. GET (Single), PUT (Update), DELETE (Delete) by ID or EmployeeId
router.route('/:id')
    .get(getAttendanceById)     // GET    http://localhost:5000/api/attendance/:id
    .put(updateAttendance)      // PUT    http://localhost:5000/api/attendance/:id
    .delete(deleteAttendance);  // DELETE http://localhost:5000/api/attendance/:id

module.exports = router;
