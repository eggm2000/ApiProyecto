import { Router } from "express";
import {
  eliminarProveedor,
  getProveedorID,
  insertProveedor,
  listarProveedor,
  updateProveedor,
} from "../controladores/proveedorCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarProveedor", listarProveedor);
router.post("/getProveedorID", getProveedorID);
router.post("/insertProveedor", insertProveedor);
router.post("/updateProveedor", updateProveedor);
router.post("/eliminarProveedor", eliminarProveedor);

export default router;
