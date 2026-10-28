// ==========================================
// 📁 controllers/employeeController.js
// 🎯 Kaam: Employee ke CRUD operations (employeeId, name, manager, isAvailable)
// ==========================================

const Employee = require('../models/Employee');

// 1️⃣ POST: Naya Employee add karein
// Route: POST /api/employees
exports.addEmployee = async (req, res) => {
    try {
        const { employeeId, name, manager, isAvailable } = req.body;

        // Validation
        if (!employeeId || !name) {
            return res.status(400).json({
                success: false,
                message: 'Kripya employeeId aur name provide karein!'
            });
        }

        // Check duplicate
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: `Employee ID "${employeeId}" pehle se maujood hai!`
            });
        }

        // Naya employee create karein
        const newEmployee = new Employee({
            employeeId,
            name,
            manager: manager || 'General Manager',
            isAvailable: isAvailable !== undefined ? isAvailable : true
        });

        const savedEmployee = await newEmployee.save();

        res.status(201).json({
            success: true,
            message: 'Employee successfully add ho gaya!',
            data: savedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employee add karne me error aaya',
            error: error.message
        });
    }
};

// 2️⃣ GET: Sabhi Employees ki list nikalein
// Route: GET /api/employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employees fetch karne me error aaya',
            error: error.message
        });
    }
};

// 3️⃣ GET: Single Employee ko employeeId se dhoondein (FIND)
// Route: GET /api/employees/:employeeId
exports.getEmployeeById = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findOne({ employeeId });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: `Employee ID "${employeeId}" nahi mila!`
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employee dhoondhne me error aaya',
            error: error.message
        });
    }
};

// 4️⃣ PUT: Employee detail update karein
// Route: PUT /api/employees/:employeeId
exports.updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { name, manager, isAvailable } = req.body;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (manager !== undefined) updateData.manager = manager;
        if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                message: `Update karne ke liye Employee ID "${employeeId}" nahi mila!`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Employee details successfully update ho gayi!',
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employee update karne me error aaya',
            error: error.message
        });
    }
};

// 5️⃣ DELETE: Employee ko delete karein
// Route: DELETE /api/employees/:employeeId
exports.deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const deletedEmployee = await Employee.findOneAndDelete({ employeeId });

        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: `Delete karne ke liye Employee ID "${employeeId}" nahi mila!`
            });
        }

        res.status(200).json({
            success: true,
            message: `Employee "${deletedEmployee.name}" successfully delete ho gaya!`,
            data: deletedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Employee delete karne me error aaya',
            error: error.message
        });
    }
};
