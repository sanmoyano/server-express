const fs = require('fs/promises')
const path = require('path')

class ProductManager {
  constructor() {
    this.filepath = path.join(__dirname, 'products.json')
  }

  async addProduct ({title, description, price, thumbnail, code, stock, id}) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data) 

    const existingProducts = products?.find(product => product.code === code)
    if(existingProducts) {
      console.log(`El producto con el ${code} ya esxiste`)
      return
    }

    if(!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios")
      return
    }

    const newId = products[products.length - 1]?.id || 1
    products.push({
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
    const products = JSON.parse(data)

    return products
  }

  async getProductById(productId) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)

    const findProduct = products?.find(product => product.id === productId)
    
    return findProduct ? console.log(findProduct) : console.log(`El producto con ID ${productId} no existe`)
  }

  async updateProduct(productId, {title, description, price, thumbnail, code, stock}) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)

    const updateProduct = products.map(product => {
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
    const products = JSON.parse(data)

    const updateProducts = products?.filter(product => product.id !== productId)
   
   await fs.writeFile(this.filepath, JSON.stringify(updateProducts, null, 2)) 
    console.log(`El producto ID:${productId} fue eliminado`)
  }
}


const product = new ProductManager()
async function main() {
  await product.addProduct({
    title:"Zapatillas",
    description:"Par de zapatillas",
    price:12000,
    code:4567,
    stock:200,
    thumbnail:"imagen zapatillas"
  })
}

main()
