const express = require("express");
const ProductManager = require("./ProductManager/ProductManager");
const fs = require("fs/promises");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Ruta inicial
app.get("/", async (req, res) => {
  res.send("<h1 style='color: blue; text-align: center;'>Bievenido</h1>");
});

// Obtener todos los productos
app.get("/products", async (req, res) => {
  const limit = req.query.limit; // Limite de consulta
  const allProducts = await ProductManager.getProducts(); // todos los products del archivo products.json

  if (limit) {
    const limitedArr = allProducts.slice(0, parseInt(limit));
    res.send(`<pre>${JSON.stringify(limitedArr, null, 2)}</pre>`);
  } else {
    res.send(`<pre>${JSON.stringify(allProducts, null, 2)}</pre>`);
  }
});

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const productById = await ProductManager.getProductById(parseInt(productId));
  res.send(`<pre>${JSON.stringify(productById, null, 2)}</pre>`);
});

app.listen(8080, () => console.log("Servidor en puerto 8080"));
