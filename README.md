# 📋 Attendance Management Backend (Node.js + Express + MongoDB)

Simple, beginner-friendly backend with fields:
* `employeeId`
* `name`
* `manager`
* `status` ("Present" / "Absent" / "Half Day" / "Leave")
* `isAvailable` (true / false)
* `attendanceDate` (YYYY-MM-DD)

---

## 🌐 Live Render URL
`https://atend.onrender.com/api/attendance`

---

## 📡 API Endpoints

### 1️⃣ POST: Attendance Add Karein
- **URL:** `POST https://atend.onrender.com/api/attendance` (या `POST https://atend.onrender.com/api/devices`)
- **Body (JSON):**
```json
{
  "employeeId": "EMP101",
  "name": "Ajay Kumar",
  "manager": "Rajesh Sharma",
  "status": "Present",
  "isAvailable": true,
  "attendanceDate": "2026-10-28"
}
```

### 2️⃣ GET: Sabhi Attendance Nikalein
- **URL:** `GET https://atend.onrender.com/api/attendance`
- **Filter by Date & Status:** `GET https://atend.onrender.com/api/attendance?attendanceDate=2026-10-28&status=Present`

### 3️⃣ GET (FIND): Single Employee Attendance
- **URL:** `GET https://atend.onrender.com/api/attendance/EMP101`

### 4️⃣ PUT: Attendance Update Karein
- **URL:** `PUT https://atend.onrender.com/api/attendance/EMP101`
- **Body (JSON):**
```json
{
  "name": "Ajay Kumar",
  "manager": "Rajesh Sharma",
  "status": "Absent",
  "isAvailable": false,
  "attendanceDate": "2026-10-28"
}
```

### 5️⃣ DELETE: Attendance Delete Karein
- **URL:** `DELETE https://atend.onrender.com/api/attendance/EMP101`
