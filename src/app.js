const express = require('express')
const app = express()
const ProductManager = require('./productManager')
const producManager = new ProductManager('products.json')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('HOLA PRODUCTOS')
})

app.get('/productos', async (req,res) => {
  const { limit } = req.query
  console.log(`Buscando productos con ${limit}`)
  const products = await producManager.getProducts()
  
  let filteredProducts = products

  if(limit){
    filteredProducts = filteredProducts
      .filter(p => p.title.includes(limit) || p.description.includes(limit))
    res.send(filteredProducts)
  } else {
    res.send(products)
  }
})

app.get('/productos/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)
  const product = await producManager.getProductById(productId)


  if (product) {
    res.send(product);
  } else {
    res.send('El producto no existe');
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Express server at http://localhost:${3000}`)
})