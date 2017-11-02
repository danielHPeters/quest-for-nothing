'use strict'

const router = require('express').Router()
const LevelLoader = require('./../../editor/backend/LevelLoader')

// Register all routes here. Each requires a pug view with same name in lowercase.
// '/' will redirect to the first one in the list
const pages = ['Home', 'Game', 'Controls', 'About', 'Levels', 'Editor']

router.get('/', (req, res, next) => {
  res.redirect('/' + pages[0].toLowerCase())
})

pages.forEach((page) => {
  router.get('/' + page.toLowerCase(), (req, res, next) => {
    res.render(page.toLowerCase(), {title: page, pages: pages})
  })
})

router.post('/add-level', (req, res, next) => {
  LevelLoader.saveToJson(req.body)
})

module.exports = router
