// ----------- Countdown -----------

const dayElement = document.getElementById('day')
const hourElement = document.getElementById('hour')
const minElement = document.getElementById('min')
const secElement = document.getElementById('sec')

const bFriday = '30 Jul 2021'

function countdown() {
  const bFridayDate = new Date(bFriday)
  const currentDate = new Date()

  const totalSeconds = (bFridayDate - currentDate) / 1000

  const day = Math.floor(totalSeconds / 3600 / 24)
  const hour = Math.floor(totalSeconds / 3600) % 24
  const min = Math.floor(totalSeconds / 60) % 60
  const sec = Math.floor(totalSeconds) % 60

  dayElement.innerHTML = day
  hourElement.innerHTML = formatTime(hour)
  minElement.innerHTML = formatTime(min)
  secElement.innerHTML = formatTime(sec)
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

countdown()

setInterval(countdown, 1000)

// ----------- Storing objects in local Storage -----------

function cadastrarEmail() {
  if (typeof Storage !== 'undefined') {
    if (localStorage.listaEmail) {
      localStorage.listaEmail = Number(localStorage.listaEmail) + 1
    } else {
      localStorage.listaEmail = 1
    }

    var novoCadastro =
      document.getElementById('nome').value +
      ' ; ' +
      document.getElementById('email').value
    localStorage.setItem(
      'novoCadastro_' + localStorage.listaEmail,
      novoCadastro
    )
  } else {
  }
}

//----------- Toggle Menu -----------

function toggleMenu() {
  const menuToggle = document.querySelector('.toggle')
  const navigation = document.querySelector('.navigation')

  menuToggle.classList.toggle('active')
  navigation.classList.toggle('active')
}

// ----------- Storing products in local Storage -----------

let carrinho = document.querySelectorAll('.button-comprar')

for (let i = 0; i < carrinho.length; i++) {
  carrinho[i].addEventListener('click', () => {
    carrinhos(carrinho[i])
  })
}

function encherCarrinho() {
  let totalProdutos = localStorage.getItem('carrinhos')

  if (totalProdutos) {
    document.querySelector('.card h3').textContent = totalProdutos
  }
}

function carrinhos(product) {
  console.log('O produto é', carrinho)
  let totalProdutos = localStorage.getItem('carrinhos')

  totalProdutos = parseInt(totalProdutos)

  if (totalProdutos) {
    localStorage.setItem('carrinhos', totalProdutos + 1)
    document.querySelector('.card h3').textContent = totalProdutos + 1
  } else {
    localStorage.setItem('carrinhos', 1)
    document.querySelector('.card h3').textContent = 1
  }
  setItems(product)
}
let cartItems = localStorage.getItem('ProdutosNoCarrinho')
cartItems = JSON.parse(cartItems)
function setItems(product) {
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = { cartItems, [product.tag]: product }
    }
    cartItems[product.tag].inCart += 1
  } else {
    product.inCart = 2
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem('ProductsInCart', JSON.stringify(cartItems))
}

//adding data to localstorage
const botaoAdicionar = document.getElementsByClassName('button-comprar')
let items = []

for (let i = 0; i < botaoAdicionar.length; i++) {
  botaoAdicionar[i].addEventListener('click', function (e) {
    console.log(e.target.parentElement.children[1].textContent)

    if (typeof Storage !== 'undefined') {
      let item = {
        id: i + 1,
        name: e.target.parentElement.children[1].textContent
      }

      if (JSON.parse(localStorage.getItem('items')) === null) {
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
      } else {
        const localItems = JSON.parse(localStorage.getItem('items'))
        localItems.map(data => {
          if (item.id == data.id) {
            item.no = item.no + 1
            console.log(item)
          } else {
          }
        })
      }
    } else {
      alert('LocalStorage não está funcionando no seu browser')
    }
  })
}
