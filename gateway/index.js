const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

// Konfigurasi URL Service
const AUTH_SERVICE = 'http://127.0.0.1:5001/api/auth';
const EMPLOYEE_SERVICE = 'http://127.0.0.1:8000/api';
const ATTENDANCE_SERVICE = 'http://127.0.0.1:5002/api';

// 1. Route Login (Ke Auth Service)
app.post('/api/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Auth Service Down" });
    }
});

// 2. Middleware Khusus untuk Employee Service (Cara paling aman dari Error Regex)
app.use('/api/employees', async (req, res) => {
    try {
        const method = req.method.toLowerCase();
        // Mengarahkan langsung semua yang berawal dari /api/employees ke Laravel
        // req.url di sini akan berisi path setelah /api/employees (misal: /1 atau /)
        const targetUrl = `${EMPLOYEE_SERVICE}/employees${req.url}`;
        
        const response = await axios({
            method: method,
            url: targetUrl,
            data: req.body
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Employee Service Down" });
    }
});

// 3. Route Attendance (Ke Attendance Service)
app.get('/api/attendance', async (req, res) => {
    try {
        const response = await axios.get(`${ATTENDANCE_SERVICE}/attendance`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Attendance Service Down" });
    }
});

app.listen(PORT, () => console.log(`GATEWAY aktif di http://localhost:${PORT}`));