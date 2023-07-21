const { Router } = require('express')
const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

const router = Router()

router.get('/', async (req, res) => {
  const products = await productManager.getProducts()
  // res.send('HOLA a todos')
  // res.render('realTimeProducts', {products})
  res.render('realTimeProducts',{
    title:'Real Time Products',
    products,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin',
    }
  })
})

module.exports = router