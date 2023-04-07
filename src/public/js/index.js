const socket = io() //eslint-disable-line
const productExample = {
  title: 'Motorola edge 30 ultra',
  description: 'Celular',
  code: 'MOTO30ULTRA',
  price: 1200,
  thumbnail: [
    'https://coppelar.vtexassets.com/arquivos/ids/1750574-800-auto?v=638055093574330000&width=800&height=auto&aspect=true'
  ],
  stock: 5,
  status: true
}

const productExample2 = {
  title: 'Iphone 14 pro',
  description: 'Celular',
  code: 'APPLE14',
  price: 1500,
  thumbnail: [
    'https://bittstores.com/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-deep-purple-.jpeg'
  ],
  stock: 2,
  status: true
}

const productExample3 = {
  title: 'Samsung s20',
  description: 'Celular',
  code: 'SAMSUNG20',
  price: 900,
  thumbnail: [
    'https://http2.mlstatic.com/D_NQ_NP_693338-MLA52383237205_112022-O.jpg'
  ],
  stock: 2,
  status: true
}

socket.on('getproducts', productos => {
  renderProds(productos)
})

socket.on('actualizarProductos', prods => {
  return renderProds(prods)
})

socket.on('deleteProduct', data => console.log(data))

const formEliminar = document?.getElementById('productform')
const inputEliminar = document?.getElementById('eliminar')
const formAddProduct = document?.getElementById('addProduct')
const newProduct = document?.getElementById('product')
formEliminar?.addEventListener('submit', e => {
  e.preventDefault()
  if (inputEliminar.value === '') return
  socket.emit('deleteProduct', inputEliminar.value)
})

formAddProduct?.addEventListener('submit', e => {
  e.preventDefault()

  let product
  switch (newProduct.value.toLowerCase().trim()) {
    case 'motorola':
      product = productExample
      break
    case 'iphone':
      product = productExample2
      break
    case 'samsung':
      product = productExample3
      break
    default:
      break
  }

  socket.emit('addProduct', product)
})

function renderProds(prods) {
  const productsContainer = document?.getElementById('productos-lista')
  if (prods === null) {
    if (productsContainer === null) {
      return
    }
    productsContainer.innerHTML = '<h1>No hay productos</h1>'
    return
  }
  if (productsContainer === null) {
    return
  }
  productsContainer.innerHTML = ''

  prods.forEach(producto => {
    const productDiv = document.createElement('div')
    productDiv.innerHTML += `
      <h2>${producto.title}</h2>
      <p>${producto.description}</p>
      <p>Código: ${producto.code}</p>
      <p>Precio: ${producto.price}</p>
      <img src='${producto.thumbnail}' alt='${producto.title}' height="auto" width="100"/>
      <p>Stock: ${producto.stock}</p>
      <p style="color: red; font-size: 20px; background: black; font: bold; padding: 4px;">ID: ${producto.id}</p>
    `
    productsContainer.appendChild(productDiv).className = 'prodContainer'
  })
}
