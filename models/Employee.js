// ==========================================
// 📁 models/Employee.js
// 🎯 Kaam: Employee ka Schema (Data Structure) define karna
// ==========================================

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Employee ID zaroori hai'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Employee ka naam zaroori hai'],
        trim: true
    },
    department: {
        type: String,
        default: 'General',
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // createdAt aur updatedAt automatically add karega
});

module.exports = mongoose.model('Employee', employeeSchema);
