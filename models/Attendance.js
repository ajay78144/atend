// ==========================================
// 📁 models/Attendance.js
// 🎯 Only 5 Fields: employeeId, name, manager, isAvailable, attendanceDate
// ==========================================

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'employeeId dena zaroori hai'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'name dena zaroori hai'],
        trim: true
    },
    manager: {
        type: String,
        required: [true, 'manager dena zaroori hai'],
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    attendanceDate: {
        type: String,
        required: [true, 'attendanceDate zaroori hai (Format: YYYY-MM-DD)'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
