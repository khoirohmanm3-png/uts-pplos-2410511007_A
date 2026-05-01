const express = require('express');
const app = express();
const port = 3000;

// Middleware agar bisa membaca JSON dari Body Postman
app.use(express.json());

// IDENTITAS UTAMA (WAJIB UNTUK UTS)
const myProfile = {
    nama: "Khoirohman",
    nim: "2410511007",
    status: "Active - Port 3000"
};

// 1. GET - Cek Identitas & Koneksi
app.get('/', (req, res) => {
    res.json({
        message: "Selamat Datang di Gateway Khoirohman",
        data: myProfile
    });
});

// 2. GET - Ambil Data (Read)
app.get('/api/resource', (req, res) => {
    res.json({
        method: "GET",
        message: "Berhasil mengambil data",
        owner: myProfile.nama
    });
});

// 3. POST - Tambah Data (Create)
app.post('/api/resource', (req, res) => {
    const dataInput = req.body;
    res.status(201).json({
        method: "POST",
        message: "Data berhasil ditambahkan",
        data_masuk: dataInput,
        creator: myProfile.nim
    });
});

// 4. PUT/PATCH - Update Data (Update)
app.put('/api/resource/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        method: "PUT",
        message: `Data dengan ID ${id} berhasil diperbarui`,
        updated_by: myProfile.nama
    });
});

// 5. DELETE - Hapus Data (Delete)
app.delete('/api/resource/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        method: "DELETE",
        message: `Data dengan ID ${id} telah dihapus`,
        auth: myProfile.nim
    });
});

app.listen(port, () => {
    console.log(`========================================`);
    console.log(`GATEWAY UTS - KHOIROHMAN (2410511007)`);
    console.log(`Berjalan di: http://localhost:${port}`);
    console.log(`========================================`);
});