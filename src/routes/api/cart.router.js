const { Router } = require('express')
const router = Router()
const CartManager = require('../../manager/CartManager')

const cartManager = new CartManager('cart.json')

router.post('/', async (req, res) => {
  const { body } = req
  const newCart = await cartManager.createCart(body)
  res.sendStatus(201).send(newCart)
})

router.get('/:cId', async (req, res) => {
  const { cId } = req.params
  const productId = parseInt(cId)

  const cartProducts = await cartManager.getCartProducts(productId)

  if(!cartProducts) {
    res.sendStatus(404)
    return
  }

  res.send(cartProducts)
})

router.post('/:cId/product/:pId', async (req, res) => {
  const { cId, pId} = req.params
  const cartId = parseInt(cId)
  const productId = parseInt(pId)

  const cartProduct = await cartManager.addProductToCart(cartId, productId)

  if(!cartProduct){
    res.sendStatus(404)
    return
  }

  res.sendStatus(201)
})

module.exports = router