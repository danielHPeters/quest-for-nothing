'use strict'

const express = require('express')
const router = express.Router()

const pages = ['Home', 'Game', 'Controls', 'About', 'Levels']

router.get('/', function (req, res, next) {
  res.redirect('/' + pages[0].toLowerCase())
})

pages.forEach(function (page) {
  router.get('/' + page.toLowerCase(), function (req, res, next) {
    res.render(page.toLowerCase(), {title: page, pages: pages})
  })
})

module.exports = router
