const express = require("express");
const ProductManager = require("./ProductManager/ProductManager");
const PORT = 8080;
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

  if (parseInt(limit)) {
    const limitedArr = allProducts.slice(0, parseInt(limit));
    res.send(`<pre>${JSON.stringify(limitedArr, null, 2)}</pre>`);
  } else if (isNaN(parseInt(limit))) {
    res.send(`<p>Solamente numeros aceptados en la query</p>`);
  } else {
    res.send(`<pre>${JSON.stringify(allProducts, null, 2)}</pre>`);
  }
});

//obtener un producto por ID, ids actuales = 0,1 y 2
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  if (isNaN(parseInt(productId))) {
    res.send("<p>Solamente pasar numero en la query</p>");
  } else {
    const productById = await ProductManager.getProductById(parseInt(productId));
    res.send(`<pre>${JSON.stringify(productById, null, 2)}</pre>`);
  }
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
