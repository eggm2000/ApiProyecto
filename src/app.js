import cors from "cors"; //importa los paquetes cors --permisos de accesos
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import inventarioRoutes from "./routes/inventario.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import proveedorRoutes from "./routes/proveedor.routes.js";
import usuariosRoutes from "./routes/usuario.routes.js";

//definir el modulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
  origin: "*", //la direccion ip del servidor
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  cedentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // Para que interprete los objetos JSON
app.use(express.urlencoded({ extended: true })); //se añade para poder receptar formularios
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Rutas

app.use("/api", inventarioRoutes);
app.use("/api", productosRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", usuariosRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});
// Middleware para manejar JSON
app.use(express.json());

// Middleware para manejar application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

export default app;
