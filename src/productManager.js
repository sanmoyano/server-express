const fs = require('fs/promises')
const path = require('path')

class ProductManager {
  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, 'products.json')
    this.products = []
  }

  async addProduct ({title, description, price, thumbnail, code, stock, id}) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.products = JSON.parse(data) 

    const existingProducts = this.products?.find(product => product.code === code)
    if(existingProducts) {
      console.log(`El producto con el ${code} ya esxiste`)
      return
    }

    if(!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios")
      return
    }

    const newId = this.products[products.length - 1]?.id || 1
    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: newId + 1
    })

    await fs.writeFile(this.filepath, JSON.stringify(products, null, 2))
    console.log(`El producto ${title} fue agregado`)
  }
  
  async getProducts(){
    const data = await fs.readFile(this.filepath, 'utf-8')
     this.products = JSON.parse(data)

    return this.products
  }

  async getProductById(productId) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.products = JSON.parse(data)

    const findProduct = this.products?.find(product => product.id === productId)
    
    if (findProduct) {
      return findProduct;
    } else {
      console.log(`El producto con ID ${productId} no existe`);
      return null;
    }
    // return findProduct ? console.log(findProduct) : console.log(`El producto con ID ${productId} no existe`)
  }

  async updateProduct(productId, {title, description, price, thumbnail, code, stock}) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.products = JSON.parse(data)

    const updateProduct = this.products.map(product => {
      if(product.id === productId) {
        return {
          ...product,
          title: title || product.title,
          description: description || product.description,
          price: price || product.price,
          thumbnail: thumbnail || product.thumbnail,
          code: code || product.code,
          stock: stock || product.stock
        };
      }
      return product
    })

    await fs.writeFile(this.filepath, JSON.stringify(updateProduct, null, 2))
    console.log(`El producto con ID: ${productId} fue actualizado`)
  }

  async deleteProduct(productId) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.products = JSON.parse(data)

    const updateProducts = this.products?.filter(product => product.id !== productId)
   
   await fs.writeFile(this.filepath, JSON.stringify(updateProducts, null, 2)) 
    console.log(`El producto ID:${productId} fue eliminado`)
  }
}
 
module.exports = ProductManager

