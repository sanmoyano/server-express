const socket = io()

const realTimeProducts = document.querySelector('#realTimeProducts')

function addProductToDOM({id, price, title, description, thumbnail}) {
  const div =  document.createElement('div')

  div.innerHTML = `
  <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <img alt="foto producto" />
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">${title}</h3>
          <h5>USD ${price}</h5>
          ${thumbnail.reduce((acc, thumb) => acc + `<span class="uk-badge">${thumb}</span>`, '')}
          <p>${description}</p>
          <button onclick="addToCart(${id})" class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>
        </div>
      </div>  
  `
  realTimeProducts.appendChild()
}

socket.on('msg', (msg) => {
  console.log(msg)
})

socket.on('newProduct', (product) => {
  location.reload()
  addProductToDOM(product)  
})
