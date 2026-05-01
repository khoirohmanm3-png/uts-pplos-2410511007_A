const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/attendance', (req, res) => {
    res.json([{ employee_id: 1, status: "Hadir", date: "2026-05-01" }]);
});

app.listen(5002, () => console.log("ATTENDANCE SERVICE aktif di port 5002"));