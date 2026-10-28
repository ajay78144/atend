// ==========================================
// 📁 controllers/attendanceController.js
// 🎯 Operations: POST, GET, PUT (Update), DELETE
// Fields: employeeId, name, manager, isAvailable, attendanceDate
// ==========================================

const Attendance = require('../models/Attendance');

// 1️⃣ POST: Nayi Attendance add/mark karna
// Route: POST /api/attendance
exports.postAttendance = async (req, res) => {
    try {
        const { employeeId, name, manager, isAvailable, attendanceDate } = req.body;

        // Validation: Required fields check karein
        if (!employeeId || !name || !manager || !attendanceDate) {
            return res.status(400).json({
                success: false,
                message: 'Kripya employeeId, name, manager aur attendanceDate sabhi provide karein!'
            });
        }

        // Attendance save karein
        const newAttendance = new Attendance({
            employeeId,
            name,
            manager,
            isAvailable: isAvailable !== undefined ? isAvailable : true,
            attendanceDate
        });

        const savedData = await newAttendance.save();

        res.status(201).json({
            success: true,
            message: 'Attendance successfully add ho gayi!',
            data: savedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance add karne me error aaya',
            error: error.message
        });
    }
};

// 2️⃣ GET: Sabhi Attendance records nikalna
// Route: GET /api/attendance
// Optional filter by attendanceDate: GET /api/attendance?attendanceDate=2026-10-28
exports.getAttendance = async (req, res) => {
    try {
        const { attendanceDate, employeeId } = req.query;
        let filter = {};

        if (attendanceDate) filter.attendanceDate = attendanceDate;
        if (employeeId) filter.employeeId = employeeId;

        const records = await Attendance.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance fetch karne me error aaya',
            error: error.message
        });
    }
};

// 3️⃣ GET (FIND): Single Attendance record dhoondhna (ID ya EmployeeId se)
// Route: GET /api/attendance/:id
exports.getAttendanceById = async (req, res) => {
    try {
        const { id } = req.params;

        // Pehle MongoDB ID se dhoondein, agar na mile to employeeId se
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            record = await Attendance.findById(id);
        }
        if (!record) {
            record = await Attendance.findOne({ employeeId: id });
        }

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `Attendance record "${id}" nahi mila!`
            });
        }

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Attendance dhoondhne me error aaya',
            error: error.message
        });
    }
};

// 4️⃣ PUT: Attendance record update karna (Agar galat lag gayi ho)
// Route: PUT /api/attendance/:id
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, manager, isAvailable, attendanceDate } = req.body;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (manager !== undefined) updateData.manager = manager;
        if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
        if (attendanceDate !== undefined) updateData.attendanceDate = attendanceDate;

        let updated = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            updated = await Attendance.findByIdAndUpdate(id, updateData, { new: true });
        }
        if (!updated) {
            updated = await Attendance.findOneAndUpdate({ employeeId: id }, updateData, { new: true });
        }

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: `Update karne ke liye record "${id}" nahi mila!`
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

// 5️⃣ DELETE: Attendance record delete karna
// Route: DELETE /api/attendance/:id
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        let deleted = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            deleted = await Attendance.findByIdAndDelete(id);
        }
        if (!deleted) {
            deleted = await Attendance.findOneAndDelete({ employeeId: id });
        }

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: `Delete karne ke liye record "${id}" nahi mila!`
            });
        }

        res.status(200).json({
            success: true,
            message: `Employee "${deleted.name}" ki attendance record successfully delete ho gayi!`,
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
