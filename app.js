// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Setup express application
const app = express();
app.use(express.static(__dirname));

// Connect to MongoDB
const dbUri = 'mongodb+srv://aardvark:255Project!@sdev255longsworth.oemxn7p.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

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