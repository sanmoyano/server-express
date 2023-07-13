const fs = require('fs/promises')
const path = require('path')

class CartManager {
  #cartProducts = []
  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname,'../data','cart.json')
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.#cartProducts = JSON.parse(data)
  }

  #writeFile = async () => {
    const data = JSON.stringify(this.#cartProducts, null, 2)
    await fs.writeFile(this.filepath, data)
  }

  async createCart() {
    await this.#readFile()

    const id = (this.#cartProducts[this.#cartProducts.length - 1]?.id || 0 ) + 1
    
    const newCart = {
      products:[],
      id
    }

    this.#cartProducts.push(newCart)
    await this.#writeFile()

    return newCart
  }

  async getCartProducts(id) {
    await this.#readFile()

    const cart = this.#cartProducts.find(cart => cart.id === id )

    return cart ? cart.products : null
  }

  async addProductToCart(cartId, productId) {
    await this.#readFile()

    const cart = this.#cartProducts.find(cart => cart.id === cartId)
    if(!cart) {
      return 
    }

    const existing = cart.products.find(item => item.product === productId)
    if(existing) {
      existing.quantity += 1
    } else {
      const newCartItem = {
        product: productId,
        quantity: 1
      }

      cart.products.push(newCartItem)
    }

    await this.#writeFile()

    return cart.products
  }

} 

module.exports = CartManager