const express = require('express');
const router = express.Router();

router.get('/', (req, res, _) => res.render('main/index.pug', {title: 'Home',page: 1,path: req.path,}));

router.get('/socials', (x, res, _) => res.redirect('https://benpai.carrd.co'));

router.get('/blank', (x, res, _) => res.render('main/blank.pug', {locked: true,}));

module.exports = router;