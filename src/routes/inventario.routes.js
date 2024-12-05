import { Router } from "express";
import {
  eliminarInventario,
  getInventarioBajo,
  getInventarioID,
  insertInventario,
  listarInventario,
  updateInventario,
} from "../controladores/inventarioCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarInventario", listarInventario);
router.post("/getInventarioID", getInventarioID);
router.post("/getInventarioBajo", getInventarioBajo);
router.post("/insertInventario", insertInventario);
router.post("/updateInventario", updateInventario);
router.post("/eliminarInventario", eliminarInventario);

export default router;
