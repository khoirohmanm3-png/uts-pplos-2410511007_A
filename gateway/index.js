const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 80;

// IDENTITAS PEMILIK (PENTING UNTUK UTS)
const myIdentity = {
    nama: "Khoirohman",
    nim: "2410511007",
    kelas: "A",
    project: "UTS PPLOS Microservices"
};

app.get('/', (req, res) => {
    res.json(myIdentity);
});

// Proxy ke Auth Service (NIM Ganjil)
app.use('/api/auth', createProxyMiddleware({ 
    target: 'http://auth-service:80', 
    changeOrigin: true 
}));

// Proxy ke Employee Service
app.use('/api/employees', createProxyMiddleware({ 
    target: 'http://employee-service:80', 
    changeOrigin: true 
}));

app.listen(port, () => {
    console.log(`Gateway Khoirohman - 2410511007 is running on port ${port}`);
});