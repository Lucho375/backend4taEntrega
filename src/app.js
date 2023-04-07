import express from 'express'
import { engine } from 'express-handlebars'
import cartsRoutes from './routes/cartsRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import viewsRoutes from './routes/viewsRoutes.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import ProductManager from './ProductManager/ProductManager.js'
const manager = new ProductManager()
// SERVER
const PORT = 8080
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/', viewsRoutes)

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor en puerto ${PORT}`)
)

const socketServer = new Server(httpServer)
socketServer.on('connection', async socket => {
  try {
    console.log('Nuevo cliente conectado')
    // let products = async () => await getProducts()
    socket.emit('getproducts', await getProducts())

    socket.on('deleteProduct', async id => {
      await manager.deleteProduct(parseInt(id))
      socketServer.emit('actualizarProductos', await getProducts())
    })
    socket.on('addProduct', async product => {
      await manager.addProduct(product)
      socketServer.emit('actualizarProductos', await getProducts())
    })
  } catch (error) {
    console.log(error)
  }
})

// HANDLEBARS
app.engine(
  'handlebars',
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: `${__dirname}/views/layouts/index.handlebars`
  })
)
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
// Ruta de productos

async function getProducts() {
  try {
    const data = await manager.getProducts()
    if (data instanceof Error) {
      return null
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
