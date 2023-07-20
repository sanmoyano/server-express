const {Router} = require('express')
const path = require('path')
const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

const router = Router()

router.get('/', async (req, res) => {
  const products  = await productManager.getProducts()

  res.render('home',{
    nombre:'Santiago',
    products
  })
})

router.get('/cart', (req, res) => {
  res.render('cart',{
    item: 1
  })
})

module.exports = router
