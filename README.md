# 📋 Attendance Management Backend (Node.js + Express + MongoDB)

Simple, beginner-friendly backend strictly having only 5 fields:
* `employeeId`
* `name`
* `manager`
* `isAvailable` (true / false)
* `attendanceDate` (YYYY-MM-DD)

---

## 🌐 Live Render URL
`https://atend.onrender.com/api/attendance`

---

## 📡 API Endpoints

### 1️⃣ POST: Attendance Add Karein
- **URL:** `POST https://atend.onrender.com/api/attendance`
- **Body (JSON):**
```json
{
  "employeeId": "EMP101",
  "name": "Ajay Kumar",
  "manager": "Rajesh Sharma",
  "isAvailable": true,
  "attendanceDate": "2026-10-28"
}
```

### 2️⃣ GET: Sabhi Attendance Nikalein
- **URL:** `GET https://atend.onrender.com/api/attendance`
- **Date Filter:** `GET https://atend.onrender.com/api/attendance?attendanceDate=2026-10-28`

### 3️⃣ GET (FIND): Single Employee Attendance
- **URL:** `GET https://atend.onrender.com/api/attendance/EMP101`

### 4️⃣ PUT: Attendance Update Karein
- **URL:** `PUT https://atend.onrender.com/api/attendance/EMP101`
- **Body (JSON):**
```json
{
  "name": "Ajay Kumar",
  "manager": "Rajesh Sharma",
  "isAvailable": false,
  "attendanceDate": "2026-10-28"
}
```

### 5️⃣ DELETE: Attendance Delete Karein
- **URL:** `DELETE https://atend.onrender.com/api/attendance/EMP101`
