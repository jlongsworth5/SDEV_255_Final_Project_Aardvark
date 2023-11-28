// Dependencies
const express = require('express');

// Setup express application
const app = express();

// Listen for requests
app.listen(3000);

// Respond to requests
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/courses', (req, res) => {
    res.sendFile('./html/courses.html', { root: __dirname });
});

app.get('/staff', (req, res) => {
    res.sendFile('./html/staff.html', { root: __dirname });
});

app.get('/students', (req, res) => {
    res.sendFile('./html/students.html', { root: __dirname });
});

// 404 Page - When added
/*
app.use((req, res) => {
    res.status(404).sendFile('./html/404.html', { root: __dirname });    
});
*/