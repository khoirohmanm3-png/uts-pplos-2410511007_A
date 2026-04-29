const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Masukkan Client ID & Secret dari GitHub Developer Settings Anda
const CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';

app.get('/auth/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
});

app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code
        }, { headers: { accept: 'application/json' } });

        const token = jwt.sign({ github_token: response.data.access_token }, 'RAHASIA_UTS_PPLOS');
        res.json({ message: "Login Berhasil via GitHub!", token });
    } catch (error) {
        res.status(500).json({ error: "Gagal login GitHub" });
    }
});

app.listen(PORT, () => console.log(`Auth Service menyala di port ${PORT}`));