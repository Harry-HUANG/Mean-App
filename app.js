const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, function(err) {
   if(err){console.log(err)}
});
mongoose.connection.on('connected', function () {
   console.log('Connection to database ' + config.database);
});

const app = express();

const users = require('./routes/users');
const students = require('./routes/students');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/students', verifyToken, students);

// Index Route
// Remove once front-end connected
/*
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
 */

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// Start Server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});