// ==========================================
// 📁 routes/attendanceRoutes.js
// 🎯 Kaam: Attendance API Endpoints (URL Paths) define karna
// ==========================================

const express = require('express');
const router = express.Router();

const {
    markAttendance,
    getAllAttendance,
    getAttendanceByDate,
    getAttendanceByEmployee,
    updateAttendance,
    deleteAttendance,
    updateAttendanceByEmployeeAndDate,
    deleteAttendanceByEmployeeAndDate
} = require('../controllers/attendanceController');

// 1. Attendance mark karna (POST) & Sabhi records dekhna (GET)
router.route('/')
    .post(markAttendance)     // POST /api/attendance
    .get(getAllAttendance);   // GET  /api/attendance

// 2. Specific Date ki attendance nikalna (GET)
// Example: GET /api/attendance/date/2026-10-27
router.get('/date/:date', getAttendanceByDate);

// 3. Specific Employee ki poori attendance history dekhna (GET)
// Example: GET /api/attendance/employee/EMP001
router.get('/employee/:employeeId', getAttendanceByEmployee);

// 4. EmployeeId aur Date se directly UPDATE ya DELETE karna (Super Easy for beginners)
// Example: PUT /api/attendance/update/EMP001/2026-10-27
router.put('/update/:employeeId/:date', updateAttendanceByEmployeeAndDate);
// Example: DELETE /api/attendance/delete/EMP001/2026-10-27
router.delete('/delete/:employeeId/:date', deleteAttendanceByEmployeeAndDate);

// 5. Agar Mongo _id se UPDATE karna (PUT) ya DELETE karna (DELETE) ho
router.route('/:id')
    .put(updateAttendance)    // PUT    /api/attendance/:id
    .delete(deleteAttendance);// DELETE /api/attendance/:id

module.exports = router;
