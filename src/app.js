const express = require('express')
const app = express()
const products = require('./products.json')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('HOLA PRODUCTOS')
})

app.get('/productos', (req,res) => {
  const {limit} = req.query
  console.log(`Buscando productos con ${limit}`)
  if(limit){
    const filteredProducts = products
      .filter(p => p.title.includes(limit) || p.description.includes(limit))
    res.send(filteredProducts)
  } else {
    res.send(products)
  }
})

app.get('/productos/:id', (req, res) => {
  const {id} = req.params

  for(const p of products) {
    if (p.id == id) {
      res.send(p)
      return
    }
  }

  res.send('No existe')
})

const port = 3000
app.listen(port, () => {
  console.log(`Express server at http://localhost:${3000}`)
})