const express = require('express');
const app = express();
const port = 3000;

// Middleware agar Express bisa membaca JSON dari Body Postman
app.use(express.json());

// 1. DATA TEMPORARY (Sebagai pengganti Database sementara)
let attendanceData = [
    { id: 1, nama: "Khoirohman", nim: "2410511007", keterangan: "Hadir", status_auth: "GitHub OAuth" }
];

// 2. CONFIG OAUTH (SYARAT NIM GANJIL: 2410511007)
const GITHUB_CONFIG = {
    clientId: "Ov23lihYQTGgHAz3KMMJ",
    clientSecret: "a1708ada76f250a250dfb281c14d8a43a3a861a3",
    callbackUrl: "http://localhost:3000/api/auth/callback"
};

// ==========================================
// ROUTE OAUTH (Syarat Utama UTS)
// ==========================================
app.get('/api/auth/github', (req, res) => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CONFIG.clientId}&redirect_uri=${GITHUB_CONFIG.callbackUrl}`;
    res.json({
        message: "Silahkan login menggunakan link GitHub berikut",
        login_url: authUrl,
        owner: "Khoirohman - 2410511007"
    });
});

// ==========================================
// ROUTE CRUD ABSENSI
// ==========================================

// A. GET ALL (Read) - Melihat semua data absensi
app.get('/api/attendance', (req, res) => {
    res.json({
        status: "success",
        total: attendanceData.length,
        data: attendanceData
    });
});

// B. POST (Create) - Menambah data absensi baru
app.post('/api/attendance', (req, res) => {
    const { nama, nim, keterangan } = req.body;
    const newAbsen = {
        id: attendanceData.length + 1,
        nama: nama || "Unknown",
        nim: nim || "00000000",
        keterangan: keterangan || "Hadir",
        status_auth: "GitHub OAuth"
    };
    attendanceData.push(newAbsen);
    res.status(201).json({
        message: "Data absensi berhasil ditambahkan!",
        data: newAbsen
    });
});

// C. PUT (Update) - Mengubah data absensi berdasarkan ID
app.put('/api/attendance/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { keterangan } = req.body;
    
    const index = attendanceData.findIndex(item => item.id === id);
    if (index !== -1) {
        attendanceData[index].keterangan = keterangan;
        res.json({
            message: `Data ID ${id} berhasil diupdate!`,
            data: attendanceData[index]
        });
    } else {
        res.status(404).json({ message: "Data tidak ditemukan" });
    }
});

// D. DELETE (Delete) - Menghapus data absensi
app.delete('/api/attendance/:id', (req, res) => {
    const id = parseInt(req.params.id);
    attendanceData = attendanceData.filter(item => item.id !== id);
    res.json({ message: `Data ID ${id} berhasil dihapus!` });
});

// Jalankan Server
app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`Server Absensi Khoirohman Running!`);
    console.log(`URL: http://localhost:${port}`);
    console.log(`NIM: 2410511007 (Ganjil - OAuth Active)`);
    console.log(`=========================================`);
});