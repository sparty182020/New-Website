const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.pug', {
        title: 'Home',
        path: req.path
    });
});

module.exports = router;