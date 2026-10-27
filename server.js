// ==========================================
// 📁 server.js
// 🎯 Main Entry Point: Backend Server Run Karne Ke Liye
// ==========================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// 1. .env file ko load karein
dotenv.config();

// 2. MongoDB Database connect karein
connectDB();

// 3. Express App initialize karein
const app = express();

// 4. Middlewares
app.use(cors()); // Kisi bhi frontend (React, React Native, Angular, etc.) se request allow karne ke liye
app.use(express.json()); // Request body me JSON data accept karne ke liye
app.use(express.static('public')); // Live Interactive Beginner Dashboard serve karne ke liye

// 5. API Status Route (JSON format me dekhne ke liye)
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Attendance Management System Backend is Running smoothly!',
        database: 'Connected to MongoDB Atlas',
        availableRoutes: {
            employees: {
                addEmployee: 'POST   /api/employees',
                getAllEmployees: 'GET    /api/employees',
                getEmployeeById: 'GET    /api/employees/:employeeId',
                updateEmployee: 'PUT    /api/employees/:employeeId',
                deleteEmployee: 'DELETE /api/employees/:employeeId'
            },
            attendance: {
                markAttendance: 'POST   /api/attendance',
                getAllAttendance: 'GET    /api/attendance',
                getByDate: 'GET    /api/attendance/date/:date',
                getByEmployee: 'GET    /api/attendance/employee/:employeeId',
                updateByEmployeeDate: 'PUT    /api/attendance/update/:employeeId/:date',
                deleteByEmployeeDate: 'DELETE /api/attendance/delete/:employeeId/:date',
                updateById: 'PUT    /api/attendance/:id',
                deleteById: 'DELETE /api/attendance/:id'
            }
        }
    });
});


// 6. Routes Mount karein
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// 7. 404 Not Found Handler (Agar koi galat URL daale)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// 8. Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Ready for Requests (GET, POST, PUT, DELETE)`);
    console.log(`===============================================`);
});
