const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartRouter = require('./api/cart.router')

const router = Router()

router.use('/products', ProductRouter)
// router.use('/cart', CartRouter)

module.exports = router