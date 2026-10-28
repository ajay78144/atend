// ==========================================
// 📁 models/Employee.js
// 🎯 Kaam: Employee ka Schema (employeeId, name, manager, isAvailable)
// ==========================================

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'employeeId dena zaroori hai'],
        unique: true,
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
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
