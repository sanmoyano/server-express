const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartRouter = require('./api/cart.router')
const HomeRouter = require('./home.router')

const api = Router()

api.use('/products', ProductRouter)
api.use('/cart', CartRouter)

const home = Router()

home.use('/', HomeRouter)

module.exports = {
  api,
  home
}