const { Router } = require('express')
const ProductManager = require('../../manager/ProductManager')

const producManager = new ProductManager('products.json')
const router = Router()

router.get('/', async (req,res) => {
  const { limit } = req.query
  const products = await producManager.getProducts()
  
  let filteredProducts = products

  if(limit){
    filteredProducts = filteredProducts
      .filter(p => p.thumbnail.includes(limit.toLowerCase()) || p.title.includes(limit.toLowerCase()) || p.description.includes(limit.toLowerCase()) || p.category.includes(limit.toLowerCase()))
    res.send(filteredProducts)
  } else {
    res.send(products)
  }
})

router.get('/:pId', async (req, res) => {
  const { pId } = req.params
  const productId = parseInt(pId)
  const product = await producManager.getProductById(productId)

  if(!product){
    res.sendStatus(404)
    return
  }

  res.send(product)
})

router.post('/', async (req, res) => {
  const { body, io } = req
  const product = await producManager.createProduct(body)

  io.emit('newProduct', product)

  res.status(201).send(product)
})

router.delete('/:pId', async (req, res) => {
  const { pId } = req.params
  const productId = parseInt(pId)

  if(!await producManager.getProductById(productId)) {
    res.sendStatus(404)
    return
  }

  await producManager.deleteProduct(productId)
  res.sendStatus(200)
})

router.put('/:pId', async (req, res) => {
  const { pId } = req.params
  const productId = parseInt(pId)
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

module.exports = router