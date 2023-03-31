import fs from "fs/promises";
class ProductManager {
  #products;
  #autoId;

  constructor() {
    this.#products = [];
    this.#autoId = 0;
    this.path = "./src/db/products.json";
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
      const path = await fs.readdir("./src/db");
      if (!path.find(elem => elem === "products.json")) {
        await fs.writeFile(this.path, "[]");
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
      if (!finded) {
        return `Producto ${id} no encontrado`;
      }
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
      Object.assign(productToUpdate, { ...dataUpdated, id });
      await this.#saveData();
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.#loadData();
      if (this.#products.length === 0) {
        throw Error(`No existen productos`);
      }
      if (!this.#products.find(elem => elem.id === id)) {
        throw Error(`No existe un producto con el id ${id}`);
      }
      const newArr = this.#products.filter(elem => elem.id !== id);
      this.#products = newArr;
      await this.#saveData();
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;
