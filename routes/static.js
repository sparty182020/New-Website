const express = require('express');
const router = express.Router();

router.get(`/css/d/`, (req, res) => res.sendFile(`${process.cwd()}/assets/stylesheets/general/combined.css`));

router.get(`/css/c/:file`, (req, res) => res.sendFile(`${process.cwd()}/assets/stylesheets/general/${req.params.file}.css`));

router.get(`/css/f/:file`, (req, res) => res.sendFile(`${process.cwd()}/assets/stylesheets/file-specific/${req.params.file}.css`));

router.get(`/js/lock.js`, (req, res) => res.sendFile(`${process.cwd()}/assets/scripts/Other/lock.js`));

router.get(`/js/fs/:file`, (req, res) => res.sendFile(`${process.cwd()}/assets/scripts/File-Specific/${req.params.file}`));

router.get(`/js/cg/:file`, (req, res) => res.sendFile(`${process.cwd()}/assets/scripts/CoG/${req.params.file}`));

router.get(`/f/:file`, (req, res) => res.sendFile(`${process.cwd()}/assets/fonts/${req.params.file}`));

router.get(`/icon`, (req, res) => res.setHeader('Cache-Control', 'no-cache').setHeader(`Content-Type`, `image/x-icon`).sendFile(`${process.cwd()}/assets/media/images/icon.ico`));

router.get(`/bg`, (req, res) => res.setHeader('Cache-Control', 'no-cache').setHeader(`Content-Type`, `image/svg+xml`).sendFile(`${process.cwd()}/assets/media/images/background.svg`));

router.get(`/robots.txt`, (req, res) => res.sendFile(`${process.cwd()}/metadata/robots.txt`));

router.get(`/sitemap`, (req, res) => res.setHeader(`Content-Type`, `application/xml`).sendFile(`${process.cwd()}/metadata/sitemap.xml`));

router.get(`/thumbnail`, (req, res) => res.setHeader('Cache-Control', 'no-cache').sendFile(`${process.cwd()}/assets/media/images/bg.png`));

router.get(`/chessthumbnail`, (req, res) => res.setHeader('Cache-Control', 'no-cache').sendFile(`${process.cwd()}/assets/media/images/chess.png`));

router.get(`/chess`, (req, res) => res.redirect('https://sparty18.me/chess'));

router.get('/favicon.ico', (req, res) => res.setHeader('Cache-Control', 'no-cache').sendFile(`${process.cwd()}/assets/media/images/icon.ico`));

module.exports = router;