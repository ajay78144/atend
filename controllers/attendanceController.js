// ==========================================
// 📁 controllers/attendanceController.js
// 🎯 Kaam: Attendance se jude sabhi operations (Mark, View, Update, Delete)
// ==========================================

const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Helper function: Aaj ki date ko "YYYY-MM-DD" format me lana
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 1️⃣ POST: Attendance mark karna (Present / Absent / Leave lagana)
// Route: POST /api/attendance
exports.markAttendance = async (req, res) => {
    try {
        let { employeeId, name, manager, date, status, isAvailable, remarks } = req.body;

        // Validation
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: 'employeeId dena zaroori hai!'
            });
        }

        // Agar date request me nahi di to aaj ki date le lo
        if (!date) {
            date = getTodayDate();
        }

        // Default status Present rakhein
        const attendanceStatus = status || 'Present';

        // Agar name ya manager nahi bheja, to Employee model se dhoondhein
        if (!name || !manager) {
            const emp = await Employee.findOne({ employeeId });
            if (emp) {
                if (!name) name = emp.name;
                if (!manager) manager = emp.manager;
            } else {
                if (!name) name = 'Unknown';
                if (!manager) manager = 'General Manager';
            }
        }

        // Check karein kya iss date par iss employee ki attendance pehle se lagi hai
        const existingAttendance = await Attendance.findOne({ employeeId, date });
        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: `Employee "${name}" (${employeeId}) ki attendance date "${date}" par pehle se lagi hui hai! Agar change karni hai to PUT request use karein.`,
                existingData: existingAttendance
            });
        }

        // Nayi attendance record banayein
        const newAttendance = new Attendance({
            employeeId,
            name,
            manager,
            date,
            status: attendanceStatus,
            isAvailable: isAvailable !== undefined ? isAvailable : (attendanceStatus === 'Present'),
            remarks: remarks || ''
        });

        const savedAttendance = await newAttendance.save();

        res.status(201).json({
            success: true,
            message: `Attendance marked successfully: ${attendanceStatus}!`,
            data: savedAttendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance mark karne me error aaya',
            error: error.message
        });
    }
};

// 2️⃣ GET: Sabhi Attendance records dekhna (Filter by Date / EmployeeId / Status support)
// Route: GET /api/attendance
// Example Query: /api/attendance?date=2026-10-27 ya /api/attendance?employeeId=EMP001
exports.getAllAttendance = async (req, res) => {
    try {
        const { date, employeeId, status } = req.query;
        let filter = {};

        if (date) filter.date = date;
        if (employeeId) filter.employeeId = employeeId;
        if (status) filter.status = status;

        const records = await Attendance.find(filter).sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            total: records.length,
            filtersApplied: filter,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance records fetch karne me error aaya',
            error: error.message
        });
    }
};

// 3️⃣ GET: Kisi specific Date ki attendance nikalna (e.g. 2026-10-27)
// Route: GET /api/attendance/date/:date
exports.getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const records = await Attendance.find({ date });

        // Stats nikaalna: Present kitne hain, Absent kitne hain
        const presentCount = records.filter(r => r.status === 'Present').length;
        const absentCount = records.filter(r => r.status === 'Absent').length;
        const leaveCount = records.filter(r => r.status === 'Leave' || r.status === 'Half-day').length;

        res.status(200).json({
            success: true,
            date,
            summary: {
                totalMarked: records.length,
                present: presentCount,
                absent: absentCount,
                leave: leaveCount
            },
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Date ke mutabiq attendance nikalne me error aaya',
            error: error.message
        });
    }
};

// 4️⃣ GET: Kisi specific Employee ki poori attendance history dekhna
// Route: GET /api/attendance/employee/:employeeId
exports.getAttendanceByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const records = await Attendance.find({ employeeId }).sort({ date: -1 });

        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Employee ID "${employeeId}" ki koi attendance record nahi mili!`
            });
        }

        const totalDays = records.length;
        const presentDays = records.filter(r => r.status === 'Present').length;
        const percentage = ((presentDays / totalDays) * 100).toFixed(2);

        res.status(200).json({
            success: true,
            employeeId,
            employeeName: records[0].name,
            totalDays,
            presentDays,
            attendancePercentage: `${percentage}%`,
            history: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employee attendance history nikalne me error aaya',
            error: error.message
        });
    }
};

// 5️⃣ PUT: Agar galti se attendance galat lag gayi to UPDATE karna
// Route: PUT /api/attendance/:id
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, isAvailable, remarks, date } = req.body;

        const updateFields = {};
        if (status !== undefined) updateFields.status = status;
        if (isAvailable !== undefined) updateFields.isAvailable = isAvailable;
        if (remarks !== undefined) updateFields.remarks = remarks;
        if (date !== undefined) updateFields.date = date;

        const updated = await Attendance.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record nahi mila update karne ke liye!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Attendance successfully update ho gayi!',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance update karne me error aaya',
            error: error.message
        });
    }
};

// 6️⃣ DELETE: Attendance record delete karna
// Route: DELETE /api/attendance/:id
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Attendance.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Delete karne ke liye attendance record nahi mila!'
            });
        }

        res.status(200).json({
            success: true,
            message: `Employee "${deleted.name}" ki "${deleted.date}" ki attendance successfully delete kar di gayi!`,
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance delete karne me error aaya',
            error: error.message
        });
    }
};

// 7️⃣ PUT: Agar employeeId aur date pata ho to directly update karna (Bina Mongo _id ke)
// Route: PUT /api/attendance/update/:employeeId/:date
exports.updateAttendanceByEmployeeAndDate = async (req, res) => {
    try {
        const { employeeId, date } = req.params;
        const { status, isAvailable, remarks } = req.body;

        const updateFields = {};
        if (status !== undefined) updateFields.status = status;
        if (isAvailable !== undefined) updateFields.isAvailable = isAvailable;
        if (remarks !== undefined) updateFields.remarks = remarks;

        const updated = await Attendance.findOneAndUpdate(
            { employeeId, date },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: `Employee "${employeeId}" ki "${date}" par koi attendance nahi mili!`
            });
        }

        res.status(200).json({
            success: true,
            message: `Employee "${updated.name}" ki "${date}" ki attendance successfully update ho gayi!`,
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance update karne me error aaya',
            error: error.message
        });
    }
};

// 8️⃣ DELETE: employeeId aur date se attendance delete karna
// Route: DELETE /api/attendance/delete/:employeeId/:date
exports.deleteAttendanceByEmployeeAndDate = async (req, res) => {
    try {
        const { employeeId, date } = req.params;

        const deleted = await Attendance.findOneAndDelete({ employeeId, date });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: `Employee "${employeeId}" ki "${date}" par koi attendance nahi mili delete karne ke liye!`
            });
        }

        res.status(200).json({
            success: true,
            message: `Employee "${deleted.name}" ki "${date}" ki attendance successfully delete kar di gayi!`,
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance delete karne me error aaya',
            error: error.message
        });
    }
};

