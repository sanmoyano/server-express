const socket = io()

const bannerEl = document.querySelector('#rebaja-banner')
const cartBadgeEl = document.querySelector('#cart-badge')

socket.on('promo', ({ title, sale }) => {
  const titleEl = bannerEl.querySelector('#title')
  const saleEl = bannerEl.querySelector('#sale')


  titleEl.innerHTML = title
  saleEl.innerHTML = `${sale}%`

  bannerEl.style.visibility = 'visible'
  bannerEl.style.display = 'block'
})

function refreshPromo() {
  socket.emit('promo', null)

  socket.emit('msg', 'mensaje de broadcast')
}

function newProdcut(product) {
  socket.emit('newProduct', product)
}

socket.on('productsInCart', (products) => {
  cartBadgeEl.innerHTML = products.length
})


socket.on('msg', (msg) => {
  console.log(msg)
})


