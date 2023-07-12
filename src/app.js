const express = require('express')
const app = express()
const ProductManager = require('./productManager')
const producManager = new ProductManager('products.json')
const routes = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HOLA PRODUCTOS')
})

app.get('/api/products', async (req,res) => {
  const { limit } = req.query
  const products = await producManager.getProducts()
  
  let filteredProducts = products

  if(limit){
    filteredProducts = filteredProducts
      .filter(p => p.thumbnail.includes(limit.toLowerCase()) || p.title.includes(limit.toLowerCase()) || p.description.includes(limit.toLowerCase()))
    res.send(filteredProducts)
  } else {
    res.send(products)
  }
})

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)
  const product = await producManager.getProductById(productId)

  if(!product){
    res.sendStatus(404)
    return
  }

  res.send(product)
})

app.post('/api/products', async (req, res) => {
  const { body } = req
  const product = await producManager.createProduct(body)
  res.status(201).send(product)
})

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)

  if(!await producManager.getProductById(productId)) {
    res.sendStatus(404)
    return
  }

  await producManager.deleteProduct(productId)
  res.sendStatus(200)
})

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)
  const { body } = req

  try {
    if(!await producManager.getProductById(productId)){ 
      res.sendStatus(404)
      return
    }

    await producManager.saveProduct(productId, body)
    res.sendStatus(202)

  } catch(err) {
    res.status(500).send({
      message:'Ha ocurrido un error en el servidor',
      exeption: err.stack
    })
  }
  
})

const port = 3000
app.listen(port, () => {
  console.log(`Express server at http://localhost:${3000}`)
})