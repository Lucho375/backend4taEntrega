import { Router } from 'express'
import ProductManager from '../ProductManager/ProductManager.js'
const viewsRoutes = Router()
const manager = new ProductManager()

viewsRoutes.get('/', async (req, res) => {
  try {
    const allProducts = await manager.getProducts()
    res.render('home', { products: allProducts, title: 'Todos los productos' })
  } catch (error) {
    console.log(error)
  }
})

viewsRoutes.get('/realtimeproducts', async (req, res) => {
  res.render('realtimeproducts', { title: 'Realtime products' })
})

export default viewsRoutes
