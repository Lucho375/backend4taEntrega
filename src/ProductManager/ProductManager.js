/* eslint-disable no-useless-catch */
const fs = require("fs/promises");
const { productExample, productExample2, productExample3 } = require("./products.js");

class ProductManager {
  #products;
  #autoId;

  constructor() {
    this.#products = [];
    this.#autoId = 0;
    this.path = "./products.json";
  }

  async #saveData() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.#products, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async #loadData() {
    try {
      const path = await fs.readdir("./");
      if (!path.find(elem => elem === "products.json")) {
        await fs.writeFile(this.path, "");
      }
      const data = await fs.readFile(this.path, "utf-8");

      if (data.trim() !== "") {
        const parsedData = JSON.parse(data);
        this.#products = parsedData;
      }
    } catch (error) {
      throw error;
    }
  }

  async addProduct(prod) {
    // verificar los campos del objeto que no esten vacios
    if (!Object.values(prod).every(value => value !== null && value !== undefined && value !== "")) {
      throw Error(`Error al agregar el producto '${prod.title}', son necesarios todos los campos`);
    }

    try {
      await this.#loadData();
      const findProduct = this.#products.find(elem => elem.code === prod.code);

      if (findProduct) {
        throw Error(`El producto '${prod.title}' ya existe`);
      }
      if (this.#products.length > 0) {
        const lastProduct = this.#products[this.#products.length - 1];
        this.#autoId = lastProduct.id + 1;
      }
      const newProduct = { ...prod, id: this.#autoId };
      this.#products.push(newProduct);
      await this.#saveData();
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      await this.#loadData();
      if (this.#products.length <= 0) {
        throw Error("No hay productos en el archivo");
      }
      return this.#products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      await this.#loadData();
      const finded = this.#products.find(prod => prod.id === id);
      if (!finded) return `Producto ${id} no encontrado`;
      return finded;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, dataUpdated) {
    try {
      await this.#loadData();
      const productToUpdate = this.#products.find(prod => prod.id === id);
      if (!productToUpdate) throw Error(`Producto ${id} no encontrado`);
      Object.assign(productToUpdate, dataUpdated);
      await this.#saveData();
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.#loadData();
      const newArr = this.#products.filter(elem => elem.id !== id);
      this.#products = newArr;
      await this.#saveData();
    } catch (error) {
      throw error;
    }
  }
}

const manager = new ProductManager();

// manager.addProduct(productExample);
// manager.addProduct(productExample2);
// manager.addProduct(productExample3);

const handleManager = async () => {
  // Obtener productos
  // const products = await manager.getProducts()
  // console.log(products)
  // Obtener producto por ID
  // const productById = await manager.getProductById(1)
  // console.log(productById)
  // Borrar un producto por ID
  // await manager.deleteProduct(0)
  /*
Actualizar producto por ID
como primer parametro recibe el ID del producto
segudno parametro un objeto con los valores a actualizar
*/
  // await manager.updateProduct(1, { title: "Nuevo producto" })
};

// handleManager();

module.exports = manager;
