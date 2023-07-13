const { Router } = require('express')
const ProductManager = require('../../manager/productManager')

const producManager = new ProductManager('products.json')
const router = Router()

router.get('/', async (req,res) => {
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

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)
  const product = await producManager.getProductById(productId)

  if(!product){
    res.sendStatus(404)
    return
  }

  res.send(product)
})

router.post('/', async (req, res) => {
  const { body } = req
  const product = await producManager.createProduct(body)
  res.status(201).send(product)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id)

  if(!await producManager.getProductById(productId)) {
    res.sendStatus(404)
    return
  }

  await producManager.deleteProduct(productId)
  res.sendStatus(200)
})

router.put('/:id', async (req, res) => {
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

module.exports = router