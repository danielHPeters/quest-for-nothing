'use strict';
const router = require('express').Router();
const LevelLoader = require('../../editor/backend/LevelLoader');
const pages = ['Home', 'Game', 'Controls', 'About', 'Editor', 'Levels'];
router.get('/', (req, res, next) => {
    res.redirect('/' + pages[0].toLowerCase());
});
pages.forEach((page) => {
    router.get('/' + page.toLowerCase(), (req, res, next) => {
        res.render(page.toLowerCase(), { title: page, pages: pages });
    });
});
router.post('/add-level', (req, res, next) => {
    LevelLoader.saveToJson(req.body);
});
module.exports = router;
