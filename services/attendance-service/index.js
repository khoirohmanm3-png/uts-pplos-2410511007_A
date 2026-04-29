const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_attendance' // Pastikan nama DB ini sudah Anda buat di phpMyAdmin
});

app.post('/attendance/checkin', (req, res) => {
    const { employee_id, status } = req.body;
    const query = 'INSERT INTO attendance (employee_id, status, timestamp) VALUES (?, ?, NOW())';
    db.query(query, [employee_id, status], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Absensi berhasil dicatat!", id: result.insertId });
    });
});

app.listen(3002, () => console.log('Attendance Service menyala di port 3002'));