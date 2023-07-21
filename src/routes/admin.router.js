const { Router } = require('express')
const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

const router = Router()

router.use((req, res, next) => {
  if(req.user?.role !== 'admin') {
    res.redirect('/')
    return
  }

  next()
})

router.get('/product/add', async (req, res) => {
  res.render('admin/addProducts', {
    title:"Add new product"
  })
})


router.post('/product/add', async (req, res) => {
  await productManager.createProduct(req.body)

  res.redirect('/admin/product/add')
})

module.exports = router