const express = require('express')
const Routes = require('./routes/index.js')
const path = require('path')
const handlebars = require('express-handlebars')

const app = express()

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

const port = 8080
app.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`)
})