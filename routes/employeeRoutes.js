// ==========================================
// 📁 routes/employeeRoutes.js
// 🎯 Kaam: Employee API Endpoints (URL Paths) define karna
// ==========================================

const express = require('express');
const router = express.Router();

const {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

// 1. Naya employee add karna (POST) & Sabhi employees dekhna (GET)
router.route('/')
    .post(addEmployee)       // POST /api/employees
    .get(getAllEmployees);   // GET  /api/employees

// 2. Single employee dhoondhna (GET), Update karna (PUT), Delete karna (DELETE)
router.route('/:employeeId')
    .get(getEmployeeById)    // GET    /api/employees/:employeeId
    .put(updateEmployee)     // PUT    /api/employees/:employeeId
    .delete(deleteEmployee); // DELETE /api/employees/:employeeId

module.exports = router;
