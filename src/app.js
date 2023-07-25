const express = require('express')
const http = require('http')
const Routes = require('./routes/index.js')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const socketManager = require('./socket')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.engine('handlebars', handlebars.engine()) 
app.set('views', path.join(__dirname, '/views')) 
app.set('view engine', 'handlebars') 

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + '/public')))

app.use((req, res ,next) => {
  req.user = {
    name: 'Santiago',
    role:'admin'
  }

  next()
})

app.use('/', Routes.home)
app.use('/api', (req, res, next) => {
  req.io = io

  next()
},Routes.api)

io.on('connection', socketManager)

const port = 8080
server.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`)
})