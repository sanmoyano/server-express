const {Router} = require('express')
const path = require('path')
const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

const router = Router()

router.get('/', async (req, res) => {
  const products  = await productManager.getProducts()

  res.render('home',{
    title:'Home - Products',
    products
  })
})

router.get('/realtimeproducts', async(req, res) => {
   
})

router.get('/cart', (req, res) => {
  res.render('cart',{
    item: 1
  })
})

module.exports = router
