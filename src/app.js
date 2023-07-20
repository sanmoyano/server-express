const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api',routes)

const port = 8080
app.listen(port, () => {
  console.log(`Express server at http://localhost:${3000}`)
})