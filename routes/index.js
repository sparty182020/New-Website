const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('main/index.pug', {
        title: 'Home',
        page: 1,
        path: req.path
    });
});

router.get('/socials', (req, res, next) => {
    res.redirect('https://benpai.carrd.co');
});

router.get('/blank', (req, res, next) => {
    res.render('main/blank.pug')
});

module.exports = router;