import express from "express";
import cartsRoutes from "./routes/cartsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Ruta de productos
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
