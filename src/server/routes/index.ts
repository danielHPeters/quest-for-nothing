import * as express from 'express'
import LevelLoader from '../../editor/backend/LevelLoader'

const router = express.Router()

// Register all routes here. Each requires a pug view with same name in lowercase.
// '/' will redirect to the first one in the list
const pages = ['Home', 'Game', 'Controls', 'About', 'Editor', 'Levels']

router.get('/', (req, res, next) => res.redirect('/' + pages[0].toLowerCase()))

pages.forEach((page) => {
  router.get('/' + page.toLowerCase(), (req, res, next) => {
    res.render(page.toLowerCase(), { title: page, pages: pages })
  })
})

router.post('/add-level', (req, res, next) => LevelLoader.saveToJson(req.body))

export = router
