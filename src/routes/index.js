const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartRouter = require('./api/cart.router')
const HomeRouter = require('./home.router')
const AdminRouter = require('./admin.router')
const RealTimeRouter = require('./realtimeproducts.router')

const api = Router()

api.use('/products', ProductRouter)
api.use('/cart', CartRouter)

const home = Router()

home.use('/', HomeRouter)
home.use('/admin',AdminRouter)
home.use('/realtimeproducts', RealTimeRouter)

module.exports = {
  api,
  home,
}