# 🚀 Employee Attendance Management System - Backend

Yeh ek fully beginner-friendly, clean aur structured **Node.js + Express + MongoDB** backend hai. Iska code is tarah design kiya gaya hai ki koi bhi beginner ise 5 minute me easily samajh sake aur apne projects ya frontend (React, React Native, etc.) ke sath connect kar sake.

---

## 📁 Project Structure (Folder Structure)

```text
d:\attendence\
│
├── config/
│   └── db.js                 👉 MongoDB Atlas se connect karne ka code
│
├── models/                   👉 Data structure (Schemas)
│   ├── Employee.js           👉 Employee Model (employeeId, name, department, isAvailable)
│   └── Attendance.js         👉 Attendance Model (employeeId, name, date, status, isAvailable, remarks)
│
├── controllers/              👉 Business Logic (Asli kaam yahan hota hai)
│   ├── employeeController.js 👉 Employee ke CRUD operations (Add, Get, Update, Delete)
│   └── attendanceController.js 👉 Attendance ke CRUD operations (Mark, Date-wise, Employee-wise, Update, Delete)
│
├── routes/                   👉 API Endpoints (URL Routes)
│   ├── employeeRoutes.js     👉 /api/employees routes
│   └── attendanceRoutes.js   👉 /api/attendance routes
│
├── .env                      👉 Secrets & MongoDB URI
├── .gitignore                👉 Git me node_modules ignore karne ke liye
├── package.json              👉 Project dependencies & scripts
└── server.js                 👉 Main Server file jo app start karti hai
```

---

## ⚙️ Setup & Run

### 1. Dependencies Install karein:
```bash
npm install
```

### 2. Server Start karein:
```bash
npm start
# Ya automatic restart ke liye (Development Mode):
npm run dev
```

Server chalne par terminal me yeh message aayega:
```
✅ MongoDB Connected Successfully: cluster0-shard-00-00.gearez4.mongodb.net
🚀 Server running on http://localhost:5000
📡 Ready for Requests (GET, POST, PUT, DELETE)
```

---

## 📡 API Endpoints Guide (Requests & Responses)

---

### 👤 1. EMPLOYEE APIs (`/api/employees`)

#### A. ➕ POST: Naya Employee Add karein
- **URL:** `POST http://localhost:5000/api/employees`
- **Request Body (JSON):**
```json
{
  "employeeId": "EMP101",
  "name": "Rahul Sharma",
  "department": "IT",
  "isAvailable": true
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Employee successfully add ho gaya!",
  "data": {
    "employeeId": "EMP101",
    "name": "Rahul Sharma",
    "department": "IT",
    "isAvailable": true,
    "_id": "671e0c...",
    "createdAt": "2026-10-27T..."
  }
}
```

#### B. 📋 GET: Sabhi Employees ki List dekhein
- **URL:** `GET http://localhost:5000/api/employees`

#### C. 🔍 GET: Single Employee dhoondein (FIND)
- **URL:** `GET http://localhost:5000/api/employees/EMP101`

#### D. ✏️ PUT: Employee Detail Update karein
- **URL:** `PUT http://localhost:5000/api/employees/EMP101`
- **Request Body (JSON):**
```json
{
  "name": "Rahul Kumar Sharma",
  "department": "Senior Developer",
  "isAvailable": true
}
```

#### E. ❌ DELETE: Employee Delete karein
- **URL:** `DELETE http://localhost:5000/api/employees/EMP101`

---

### 📅 2. ATTENDANCE APIs (`/api/attendance`)

#### A. ➕ POST: Attendance Mark karein (Present / Absent)
- **URL:** `POST http://localhost:5000/api/attendance`
- **Request Body (JSON):**
```json
{
  "employeeId": "EMP101",
  "name": "Rahul Sharma",
  "date": "2026-10-27",
  "status": "Present",
  "isAvailable": true,
  "remarks": "On time"
}
```
> **Note:** Agar `date` nahi bhejenge to backend automatically **aaj ki date (YYYY-MM-DD)** laga dega.
> Ek date par ek employee ki dobara duplicate attendance nahi lag sakti. Agar galat lag gayi to PUT request use karein.

#### B. 📋 GET: Sabhi Attendance Records dekhein
- **URL:** `GET http://localhost:5000/api/attendance`
- **Filters (Optional):**
  - Date filter: `GET http://localhost:5000/api/attendance?date=2026-10-27`
  - Employee filter: `GET http://localhost:5000/api/attendance?employeeId=EMP101`
  - Status filter: `GET http://localhost:5000/api/attendance?status=Present`

#### C. 🎯 GET: Kisi Date ki poori Attendance nikalein (With Summary)
- **URL:** `GET http://localhost:5000/api/attendance/date/2026-10-27`
- **Response:**
```json
{
  "success": true,
  "date": "2026-10-27",
  "summary": {
    "totalMarked": 10,
    "present": 8,
    "absent": 2,
    "leave": 0
  },
  "data": [ ... ]
}
```

#### D. 📊 GET: Single Employee ki Attendance History & Percentage dekhein
- **URL:** `GET http://localhost:5000/api/attendance/employee/EMP101`
- **Response:**
```json
{
  "success": true,
  "employeeId": "EMP101",
  "employeeName": "Rahul Sharma",
  "totalDays": 25,
  "presentDays": 23,
  "attendancePercentage": "92.00%",
  "history": [ ... ]
}
```

#### E. ✏️ PUT: Agar galat lag gayi to Update karein
- **URL:** `PUT http://localhost:5000/api/attendance/<ATTENDANCE_MONGO_ID>`
- **Request Body (JSON):**
```json
{
  "status": "Present",
  "isAvailable": true,
  "remarks": "Corrected from Absent to Present"
}
```

#### F. ❌ DELETE: Attendance Record Delete karein
- **URL:** `DELETE http://localhost:5000/api/attendance/<ATTENDANCE_MONGO_ID>`

---

## 💡 Frontend Integration Tips
- Frontend (React / React Native) me Date Picker se jab date select hogi (e.g. `2026-10-27`), to seedha `GET /api/attendance/date/2026-10-27` call karein.
- Us date par kaun present hai aur kaun absent, list me directly render ho jayega.
- Daily attendance mark karne ke liye simple button click par `POST /api/attendance` me `{ employeeId, name, date, status: 'Present' }` bhej sakte hain.
