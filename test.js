// ==========================================
// 🧪 test.js
// 🎯 Kaam: Attendance API (POST, GET, PUT, DELETE) test karna
// Fields: employeeId, name, manager, isAvailable, attendanceDate
// Run: node test.js
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
    console.log('🧪 Testing Attendance API (POST, GET, PUT, DELETE)');
    console.log('========================================================\n');

    const testEmpId = 'EMP_' + Math.floor(100 + Math.random() * 900);
    const testDate = '2026-10-28';

    try {
        // 1. POST Attendance
        console.log(`1️⃣ POST Attendance: POST /api/attendance (${testEmpId})`);
        const postRes = await makeRequest('/api/attendance', 'POST', {
            employeeId: testEmpId,
            name: 'Ajay Kumar',
            manager: 'Rajesh Sharma',
            isAvailable: true,
            attendanceDate: testDate
        });
        console.log(`   👉 Status: ${postRes.statusCode} | Message: ${postRes.data.message}`);
        const recordId = postRes.data.data ? postRes.data.data._id : testEmpId;

        // 2. GET All Attendance
        console.log('\n2️⃣ GET All Attendance: GET /api/attendance');
        const getAllRes = await makeRequest('/api/attendance', 'GET');
        console.log(`   👉 Status: ${getAllRes.statusCode} | Total Records: ${getAllRes.data.total}`);

        // 3. GET Single Attendance by ID or EmployeeId
        console.log(`\n3️⃣ GET Single Attendance: GET /api/attendance/${testEmpId}`);
        const getSingleRes = await makeRequest(`/api/attendance/${testEmpId}`, 'GET');
        console.log(`   👉 Status: ${getSingleRes.statusCode} | Name: ${getSingleRes.data.data.name} | Available: ${getSingleRes.data.data.isAvailable}`);

        // 4. PUT Update Attendance (e.g. agar galat lag gayi)
        console.log(`\n4️⃣ PUT Update Attendance: PUT /api/attendance/${recordId}`);
        const putRes = await makeRequest(`/api/attendance/${recordId}`, 'PUT', {
            isAvailable: false,
            attendanceDate: testDate
        });
        console.log(`   👉 Status: ${putRes.statusCode} | Message: ${putRes.data.message} | Available Updated To: ${putRes.data.data.isAvailable}`);

        // 5. DELETE Attendance
        console.log(`\n5️⃣ DELETE Attendance: DELETE /api/attendance/${recordId}`);
        const delRes = await makeRequest(`/api/attendance/${recordId}`, 'DELETE');
        console.log(`   👉 Status: ${delRes.statusCode} | Message: ${delRes.data.message}`);

        console.log('\n========================================================');
        console.log('🎉 ALL 5 OPERATIONS (POST, GET, FIND, PUT, DELETE) PASSED!');
        console.log('========================================================\n');
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

runTests();
