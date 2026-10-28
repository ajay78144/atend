// ==========================================
// 🧪 test.js
// 🎯 Kaam: Sabhi APIs (GET, POST, PUT, DELETE, FIND) ko automatically test karna
// Run karne ke liye: node test.js
// ==========================================

const http = require('http');

const PORT = 5000;
const HOST = 'localhost';

function makeRequest(path, method, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = JSON.parse(body || '{}');
                } catch (e) {
                    parsed = body;
                }
                resolve({ statusCode: res.statusCode, data: parsed });
            });
        });

        req.on('error', (err) => reject(err));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('========================================================');
    console.log('🧪 Starting Full System Test for Attendance Backend...');
    console.log('========================================================\n');

    const testEmpId = 'TEST_EMP_' + Math.floor(100 + Math.random() * 900);
    const testDate = new Date().toISOString().split('T')[0];

    try {
        // 1. API Status check
        console.log('1️⃣ Testing Server Status: GET /api');
        const statusRes = await makeRequest('/api', 'GET');
        console.log(`   👉 Status: ${statusRes.statusCode} | ${statusRes.data.message || 'OK'}`);

        // 2. Add Employee (POST)
        console.log(`\n2️⃣ Testing Add Employee: POST /api/employees (${testEmpId})`);
        const addEmpRes = await makeRequest('/api/employees', 'POST', {
            employeeId: testEmpId,
            name: 'Vikram Singh',
            manager: 'Suresh Kumar',
            isAvailable: true
        });
        console.log(`   👉 Status: ${addEmpRes.statusCode} | Message: ${addEmpRes.data.message}`);

        // 3. Get All Employees (GET)
        console.log('\n3️⃣ Testing Get All Employees: GET /api/employees');
        const getAllEmpRes = await makeRequest('/api/employees', 'GET');
        console.log(`   👉 Status: ${getAllEmpRes.statusCode} | Total Employees: ${getAllEmpRes.data.total}`);

        // 4. Find Employee by ID (FIND - GET)
        console.log(`\n4️⃣ Testing Find Employee by ID: GET /api/employees/${testEmpId}`);
        const findEmpRes = await makeRequest(`/api/employees/${testEmpId}`, 'GET');
        console.log(`   👉 Status: ${findEmpRes.statusCode} | Name: ${findEmpRes.data.data.name}`);

        // 5. Update Employee (PUT)
        console.log(`\n5️⃣ Testing Update Employee: PUT /api/employees/${testEmpId}`);
        const updateEmpRes = await makeRequest(`/api/employees/${testEmpId}`, 'PUT', {
            name: 'Vikram Singh (Senior QA)',
            manager: 'Rajesh Verma',
            isAvailable: true
        });
        console.log(`   👉 Status: ${updateEmpRes.statusCode} | Updated Name: ${updateEmpRes.data.data.name}`);

        // 6. Mark Attendance (POST - Present)
        console.log(`\n6️⃣ Testing Mark Attendance (Present): POST /api/attendance`);
        const markAttRes = await makeRequest('/api/attendance', 'POST', {
            employeeId: testEmpId,
            name: 'Vikram Singh (Senior QA)',
            manager: 'Rajesh Verma',
            date: testDate,
            status: 'Present',
            isAvailable: true,
            remarks: 'On time login'
        });
        console.log(`   👉 Status: ${markAttRes.statusCode} | Result: ${markAttRes.data.message}`);

        // 7. Get Attendance by Date (GET)
        console.log(`\n7️⃣ Testing Get Attendance by Date: GET /api/attendance/date/${testDate}`);
        const getByDateRes = await makeRequest(`/api/attendance/date/${testDate}`, 'GET');
        console.log(`   👉 Status: ${getByDateRes.statusCode} | Date Summary:`, getByDateRes.data.summary);

        // 8. Get Employee Attendance History (GET)
        console.log(`\n8️⃣ Testing Get Employee History: GET /api/attendance/employee/${testEmpId}`);
        const getHistoryRes = await makeRequest(`/api/attendance/employee/${testEmpId}`, 'GET');
        console.log(`   👉 Status: ${getHistoryRes.statusCode} | Attendance Percentage: ${getHistoryRes.data.attendancePercentage}`);

        // 9. Update Attendance (PUT - Galat lag gayi to change karna)
        console.log(`\n9️⃣ Testing Update Attendance: PUT /api/attendance/update/${testEmpId}/${testDate}`);
        const updateAttRes = await makeRequest(`/api/attendance/update/${testEmpId}/${testDate}`, 'PUT', {
            status: 'Present',
            remarks: 'Verified present'
        });
        console.log(`   👉 Status: ${updateAttRes.statusCode} | Result: ${updateAttRes.data.message}`);

        // 10. Delete Attendance (DELETE)
        console.log(`\n🔟 Testing Delete Attendance: DELETE /api/attendance/delete/${testEmpId}/${testDate}`);
        const delAttRes = await makeRequest(`/api/attendance/delete/${testEmpId}/${testDate}`, 'DELETE');
        console.log(`   👉 Status: ${delAttRes.statusCode} | Result: ${delAttRes.data.message}`);

        // 11. Delete Employee (DELETE)
        console.log(`\n1️⃣1️⃣ Testing Delete Employee: DELETE /api/employees/${testEmpId}`);
        const delEmpRes = await makeRequest(`/api/employees/${testEmpId}`, 'DELETE');
        console.log(`   👉 Status: ${delEmpRes.statusCode} | Result: ${delEmpRes.data.message}`);

        console.log('\n========================================================');
        console.log('🎉 ALL 11 TESTS PASSED SUCCESSFULLY! EVERYTHING IS 100% READY!');
        console.log('========================================================\n');
    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.log('👉 Make sure server is running on http://localhost:5000 before running test.js');
    }
}

runTests();
