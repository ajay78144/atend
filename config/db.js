// ==========================================
// 📁 config/db.js
// 🎯 Kaam: MongoDB Database ko connect karna
// ==========================================

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Agar DB connect na ho to app band ho jaye
    }
};

module.exports = connectDB;
