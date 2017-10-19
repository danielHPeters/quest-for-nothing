'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/home')
})

router.get('/home', function (req, res, next) {
  res.render('index', {title: 'Home'})
})

router.get('/game', function (req, res, next) {
  res.render('game', {title: 'Game'})
})

router.get('/controls', function (req, res, next) {
  res.render('controls', {title: 'Controls'})
})

router.get('/about', function (req, res, next) {
  res.render('about', {title: 'About'})
})

module.exports = router
