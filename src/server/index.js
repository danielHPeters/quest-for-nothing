let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let favicon = require('serve-favicon')

app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')))
app.use(express.static(path.join(__dirname, '../../public')))

app.get('/', function (req, res) {
  res.send('index.html')
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!')
})
