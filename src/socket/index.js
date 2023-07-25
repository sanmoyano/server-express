const ProductManager = require('../manager/ProductManager')
const productManager = new ProductManager('products.json')

function socketManager (socket) {
  console.log(`user has connected: ${socket.id}`)

  // socket.on('RealTimeProducts', async () => {
  //   const products = await productManager.getProducts()
  //   socket.emit('products', products)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })


}


module.exports = socketManager