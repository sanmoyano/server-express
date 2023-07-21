const express = require('express')
const http = require('http')
const Routes = require('./routes/index.js')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

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
app.use('/api',Routes.api)

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('event', (saludo) => {
    console.log(saludo)
    socket.emit('event', 'hola desde el server')
  })
})

const port = 8080
server.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`)
})