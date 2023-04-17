const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
require('dotenv').config();
const { PORT: port } = process.env;

const index = require('./routes/index');
const legal = require('./routes/legal');

// use pug as the view engine
app.set('view engine', 'pug');

// set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use('/', index);
app.use('/legal', legal);
app.use((err, req, res, next) => {
    switch (err.code) {
        case 401:
        case 403:
            res
                .status(401)
                .render('err/401.pug', {
                    title: '401 Unauthorized',
                    message: 'You are not authorized to view this page.',
                    path: req.path,
                    return: req.headers.referer
                });
            break;
        default:
            res
                .status(500)
                .render('err/500.pug', {
                    title: '500 Internal Server Error',
                    message: 'An internal server error has occurred.',
                    path: req.path,
                    return: req.headers.referer
                });
            break;
    }
});

app.use((req, res, next) => {
    res
        .status(404)
        .render('err/404.pug', {
            title: '404 Not Found',
            path: req.path,
            return: req.headers.referer
        });
});

http.createServer(app).listen(port, () => {
    console.log(`Listening on port ${port}`);
});