// ==========================================
// 📁 models/Attendance.js
// 🎯 Kaam: Attendance ka Schema (employeeId, name, manager, date, status, isAvailable)
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
        default: 'General Manager',
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Attendance date zaroori hai (Format: YYYY-MM-DD)'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-day', 'Leave'],
        default: 'Present'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    remarks: {
        type: String,
        default: '',
        trim: true
    }
}, {
    timestamps: true
});

// Ek date par ek employee ki ek hi attendance lag sake (Prevent duplicate attendance)
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
