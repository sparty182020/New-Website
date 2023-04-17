const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
require('dotenv').config();
const { PORT: port } = process.env;

const router = require('./routes/router');

// use pug as the view engine
app.set('view engine', 'pug');

// set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

http.createServer(app).listen(port, () => {
    console.log(`Listening on port ${port}`);
});