import { Router } from 'express'
import CartsManager from '../CartsManager/CartsManager.js'
import ProductManager from '../ProductManager/ProductManager.js'

const cartsRoutes = Router()
const cartManager = new CartsManager()
const productManager = new ProductManager()

cartsRoutes.post('/', async (req, res) => {
  await cartManager.addCart()
  res.status(201).send({ status: 'success', message: 'cart creado' })
})

cartsRoutes.get('/:cid', async (req, res) => {
  const cartId = req.params.cid

  if (isNaN(cartId)) {
    return res.status(400).send({ status: 'error', error: 'Solamente numeros para la id' })
  }

  try {
    const cart = await cartManager.findCart(parseInt(cartId))
    res.status(200).send({ products: cart.products })
  } catch (error) {
    res.status(400).send({ status: 'error', error: error.message })
  }
})

cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid

  try {
    const findedProduct = await productManager.getProductById(+productId)

    if (isNaN(findedProduct.id)) {
      return res.status(404).send({ status: 'error', message: 'Producto no encontrado' })
    }

    const { id } = findedProduct
    await cartManager.updateCart(+cartId, id)
    res.status(201).send({ status: 'success', message: `Producto ${productId} agreagado` })
  } catch (error) {
    res.status(400).send({ status: 'error', error: error.message })
  }
})

export default cartsRoutes
