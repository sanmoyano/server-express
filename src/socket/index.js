const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

function socketManager (socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('newProduct', async (newProduct) => {
    await  productManager.createProduct(newProduct)
    socket.emit('products', newProduct)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })


}


module.exports = socketManager