// ==========================================
// 📁 models/Attendance.js
// 🎯 Kaam: Attendance ka Schema (Data Structure) define karna
// ==========================================

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Employee ID zaroori hai'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Employee ka naam zaroori hai'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Attendance ki Date zaroori hai (Format: YYYY-MM-DD)'],
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

// Ek date par ek employee ki ek hi attendance record rahe (Prevent duplicate attendance on same date)
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
