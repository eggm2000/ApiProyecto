import { Router } from "express";
import {
  eliminarProducto,
  getProductoID,
  insertProducto,
  listarProducto,
  updateProducto,
} from "../controladores/productosCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarProducto", listarProducto);
router.post("/getProductoID", getProductoID);
router.post("/insertProducto", insertProducto);
router.post("/updateProducto", updateProducto);
router.post("/eliminarProducto", eliminarProducto);

export default router;
