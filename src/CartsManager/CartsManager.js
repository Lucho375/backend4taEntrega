import fs from 'fs/promises'

class CartsManager {
  #carts
  #autoId
  #path

  constructor() {
    this.#carts = []
    this.#autoId = 0
    this.#path = './src/db/carts.json'
  }

  async #saveData() {
    try {
      await fs.writeFile(this.#path, JSON.stringify(this.#carts, null, 2))
    } catch (error) {
      throw error
    }
  }

  async #loadData() {
    try {
      const path = await fs.readdir('./src/db')
      if (!path.find(elem => elem === 'carts.json')) {
        await fs.writeFile(this.#path, '[]')
      }

      const data = await fs.readFile(this.#path, 'utf-8')

      if (data.trim() !== '') {
        const parsedData = JSON.parse(data)
        this.#carts = parsedData
      }
    } catch (error) {
      throw error
    }
  }

  async addCart() {
    try {
      await this.#loadData()

      // AutoId
      if (this.#carts.length > 0) {
        const lastCart = this.#carts[this.#carts.length - 1]
        this.#autoId = lastCart.id + 1
      }
      const newCart = { id: this.#autoId, products: [] }
      this.#carts.push(newCart)
      await this.#saveData()
    } catch (error) {
      throw error
    }
  }

  async findCart(id) {
    try {
      await this.#loadData()
      const findedCart = this.#carts.find(cart => cart.id === id)
      if (!findedCart) {
        throw new Error(`No existe el carrito ${id}`)
      }
      return findedCart
    } catch (error) {
      throw error
    }
  }

  async updateCart(cartId, productId) {
    try {
      await this.#loadData()
      const findedCart = this.#carts.find(cart => cart.id === cartId)?.products

      if (findedCart === undefined) {
        throw Error('No existe el carrito')
      }
      const findedProduct = findedCart.find(prod => prod.id === productId)

      if (findedProduct) {
        findedCart.map(elem => {
          if (elem.id === findedProduct.id) {
            return elem.quantity++
          }
          return elem
        })
      } else {
        findedCart.push({ id: productId, quantity: 1 })
      }

      await this.#saveData()
    } catch (error) {
      throw error
    }
  }
}

export default CartsManager
