const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

// Data User untuk keperluan testing UTS
const USERS = [
    { 
        email: "khoirohman@example.com", 
        password: "password123", 
        name: "Khoirohman" 
    }
];

// Endpoint Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Cari user berdasarkan email dan password
    const user = USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
        return res.status(200).json({ 
            status: "success", 
            message: "Login Berhasil",
            user: {
                name: user.name,
                email: user.email
            } 
        });
    }

    return res.status(401).json({ 
        status: "error", 
        message: "Email atau password salah" 
    });
});

app.listen(PORT, () => {
    console.log(`AUTH SERVICE berjalan di http://localhost:${PORT}`);
});