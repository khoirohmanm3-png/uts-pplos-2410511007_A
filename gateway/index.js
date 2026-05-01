const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

const EMPLOYEE_SERVICE_URL = 'http://127.0.0.1:8000';
const ATTENDANCE_SERVICE_URL = 'http://127.0.0.1:5002';

// --- AUTH & EMPLOYEE ROUTES (Laravel) ---

// Login
app.post('/api/login', async (req, res) => {
    try {
        const response = await axios.post(`${EMPLOYEE_SERVICE_URL}/api/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// Delete Employee (Fitur Baru)
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${EMPLOYEE_SERVICE_URL}/api/employees/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// --- ATTENDANCE ROUTES (Node.js) ---

app.get('/api/attendance', async (req, res) => {
    try {
        const response = await axios.get(`${ATTENDANCE_SERVICE_URL}/api/attendance`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Attendance Service Down" });
    }
});

app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}`);
});