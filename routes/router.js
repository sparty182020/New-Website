const express = require('express');
const router = express.Router();

// Importing the routes
const staticRoutes = require('./static');
const legalRoutes = require('./legal');
const indexRoutes = require('./index');

router.use((_, res, next) => {
    res
        .setHeader('X-Creator', 'https://github.com/sparty182020')
        .setHeader('X-Source-Code', 'https://github.com/sparty182020/new-website')
        .setHeader('X-Active-Page', 'https://pp.sparty18.com')
        .setHeader('X-Copyright', 'Open Source AGPL-3.0 or later');
    next();
})

// Using the routes
router.use('/static', staticRoutes);
router.use('/legal', legalRoutes);
router.use('/', indexRoutes);

// Generic error handling
router.use((err, req, res, _) => {
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
                .render('err/501.pug', {
                    title: '501 Internal Server Error',
                    message: 'An internal server error has occurred.',
                    path: req.path,
                    return: req.headers.referer
                });
            break;
    }
    console.log(err);
});

// 404 error handling
router.use((req, res, _) => {
    res
        .status(404)
        .render('err/404.pug', {
            title: '404 Not Found',
            path: req.path,
            return: req.headers.referer
        });
});

module.exports = router;
