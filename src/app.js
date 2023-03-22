const express = require("express");
const ProductManager = require("./ProductManager/ProductManager");
const app = express();
const PORT = 8080;
const { productExample, productExample2, productExample3 } = require("./ProductManager/products");

app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();
// Agregar los productos
const main = async () => {
  // await manager.addProduct(productExample);
  // await manager.addProduct(productExample2);
  // await manager.addProduct(productExample3);
};

main();

// Ruta inicial
app.get("/", async (req, res) => {
  res.send("<h1 style='color: blue; text-align: center;'>Bievenido</h1>");
});

// Obtener todos los productos
app.get("/products", async (req, res) => {
  const limit = req.query?.limit; // Limite de consulta

  const allProducts = await manager.getProducts(); // todos los products del archivo products.json

  if (!isNaN(limit)) {
    const limitedArr = allProducts.slice(0, parseInt(limit));
    res.send(`<pre>${JSON.stringify(limitedArr, null, 2)}</pre>`);
  } else if (typeof limit !== "number" && typeof limit !== "undefined") {
    res.send(`<p>Solamente numeros aceptados en la query</p>`);
  } else {
    res.send(`<pre>${JSON.stringify(allProducts, null, 2)}</pre>`);
  }
});

//obtener un producto por ID, ids actuales = 0,1 y 2
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  if (isNaN(productId)) {
    res.send("<p>Solamente pasar numero en la query</p>");
  } else {
    const productById = await manager.getProductById(parseInt(productId));
    res.send(`<pre>${JSON.stringify(productById, null, 2)}</pre>`);
  }
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
