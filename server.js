const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve the directory where server.js is

// Simple route to test
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'Wayu Farms API is working!' });
});

// Contact form (simplified - no email for now)
app.post('/api/contact', (req, res) => {
    console.log('Contact form submitted:', req.body);
    res.json({ success: true, message: 'Message received (email disabled)' });
});

// Order form (simplified)
app.post('/api/order', (req, res) => {
    console.log('Order submitted:', req.body);
    res.json({ success: true, message: 'Order received (email disabled)' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('===================================');
    console.log('Wayu Farms Server');
    console.log(`Running on: http://localhost:${PORT}`);
    console.log(`Also accessible at: http://127.0.0.1:${PORT}`);
    console.log('===================================');
    console.log('Note: Email functionality is disabled');
    console.log('Forms will work but not send actual emails');
    console.log('===================================');
});
