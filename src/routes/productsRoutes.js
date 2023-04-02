import { Router } from 'express'
import ProductManager from '../ProductManager/ProductManager.js'
import { productExample, productExample2, productExample3 } from '../ProductManager/products.js' //eslint-disable-line

const productsRoutes = Router()
const manager = new ProductManager()

// agregar productos
const main = async () => {//eslint-disable-line
  // await manager.addProduct(productExample);
  // await manager.addProduct(productExample2);
  // await manager.addProduct(productExample3);
}
// main();

// Obtener todos los productos
productsRoutes.get('/', async (req, res) => {
  const limit = req.query?.limit // Limite de consulta
  const allProducts = await manager.getProducts() // todos los products del archivo products.json

  if (!isNaN(limit)) {
    const limitedArr = allProducts.slice(0, parseInt(limit))
    res.status(200).send({ status: 'success', payload: limitedArr })
  } else if (typeof limit !== 'number' && typeof limit !== 'undefined') {
    res.status(400).send({ status: 'error', message: 'Solamente numeros permitidos en la query' })
  } else {
    res.status(200).send({ status: 'success', payload: allProducts })
  }
})

// Agregar un producto
productsRoutes.post('/', async (req, res) => {
  const product = req.body
  try {
    const newProduct = await manager.addProduct(product)
    res.status(201).send(newProduct)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// obtener un producto por ID, ids actuales = 0,1 y 2
productsRoutes.get('/:productId', async (req, res) => {
  const { productId } = req.params
  if (isNaN(productId)) {
    res.status(400).send({ status: 'error', message: 'Solamente pasar numeros en el id' })
  } else {
    const productById = await manager.getProductById(parseInt(productId))
    res.status(200).send({ productById })
  }
})

//
productsRoutes.put('/:id', async (req, res) => {
  const id = req.params.id
  const update = req.body

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ status: 'error', message: 'No se enviaron campos para actualizar' })
  }
  try {
    await manager.updateProduct(+id, update)
    res.status(200).send({ status: 'success', message: `producto ${id} modificado` })
  } catch (error) {
    return res.status(404).send({ status: 'error', error: error.message })
  }
})

// Eliminar un producto
productsRoutes.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await manager.deleteProduct(parseInt(id))
    res.status(200).send({ status: 'success', message: `producto ${id} eliminado` })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

export default productsRoutes
