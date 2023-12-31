const fs = require('fs/promises')
const path = require('path')

class ProductManager {
  #products = []
  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, '../data','products.json')
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.#products = JSON.parse(data)
  }

  #writeFile = async () => {
    const data = JSON.stringify(this.#products, null, 2)
    await fs.writeFile(this.filepath, data)
  }

  async getProducts(){
    await this.#readFile() 
    return this.#products
  }

  async getProductById(productId) {
    await this.#readFile()
    return this.#products?.find(product => product.id === productId)
  }

  async createProduct(product) {
    await this.#readFile()

    const id = (this.#products[this.#products.length - 1]?.id || 0) + 1

    const newProduct = {
      ...product,
      id
    }

    this.#products.push(newProduct)
    await this.#writeFile()

    return newProduct
  }

  async saveProduct(id, product){
    await this.#readFile()

    const existing = await this.getProductById(id)

    if(!existing) {
      return 
    }

    const updatedProduct = {
      ...existing,
      ...product
    }

    existing.title = updatedProduct.title
    existing.description = updatedProduct.description
    existing.code = updatedProduct.code 
    existing.price = updatedProduct.price
    existing.status = updatedProduct.status
    existing.stock = updatedProduct.stock
    existing.category = updatedProduct.category
    existing.thumbnail = updatedProduct.thumbnail

    await this.#writeFile()
  }

  async deleteProduct(productId) {
    await this.#readFile()
    this.#products =  this.#products?.filter(product => product.id !== productId)

    await this.#writeFile()
  }
}
 
module.exports = ProductManager

