import { conmysql } from "../db.js";

export const listarInventario = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
            SELECT i.InventarioID, i.ProductoID, p.Nombre AS NombreProducto, 
                   i.Cantidad, i.FechaUltimaActualizacion, i.ubicacion 
            FROM inventario i 
            JOIN producto p ON i.ProductoID = p.ProductoID;
        `);

    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registro para la consulta",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getInventarioID = async (req, res) => {
  try {
    const { InventarioID } = req.body;

    if (!InventarioID) {
      return res.status(400).json({
        Mensaje: "Error: El InventarioID es requerido",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM inventario WHERE InventarioID = ?",
      [InventarioID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el inventario"
          : "No se encontró el inventario",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getInventarioBajo = async (req, res) => {
  try {
    const { Cant } = req.body;

    if (!Cant) {
      return res.status(400).json({
        Mensaje: "Error: Ingrese la cantidad",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      `
            SELECT i.InventarioID, i.ProductoID, p.Nombre AS NombreProducto, 
                   i.Cantidad, i.FechaUltimaActualizacion, i.ubicacion 
            FROM inventario i 
            JOIN producto p ON i.ProductoID = p.ProductoID 
            WHERE i.Cantidad < ?;
        `,
      [Cant]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró los datos"
          : "No se encontró con la cantidad indicada",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const insertInventario = async (req, res) => {
  try {
    const { ProductoID, Cantidad, FechaUltimaActualizacion, ubicacion } =
      req.body;

    const [result] = await conmysql.query(
      `
            INSERT INTO inventario (ProductoID, Cantidad, FechaUltimaActualizacion, ubicacion) 
            VALUES (?, ?, ?, ?);
        `,
      [ProductoID, Cantidad, FechaUltimaActualizacion, ubicacion]
    );

    res.json({ Mensaje: "Se guardó correctamente", id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateInventario = async (req, res) => {
  try {
    const {
      InventarioID,
      ProductoID,
      Cantidad,
      FechaUltimaActualizacion,
      ubicacion,
    } = req.body;

    const [result] = await conmysql.query(
      `
            UPDATE inventario 
            SET ProductoID = ?, Cantidad = ?, FechaUltimaActualizacion = ?, ubicacion = ? 
            WHERE InventarioID = ?;
        `,
      [ProductoID, Cantidad, FechaUltimaActualizacion, ubicacion, InventarioID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ Mensaje: "Inventario no encontrado" });
    }

    res.json({ Mensaje: "Se actualizó correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const eliminarInventario = async (req, res) => {
  try {
    const { InventarioID } = req.body;

    const [result] = await conmysql.query(
      "DELETE FROM inventario WHERE InventarioID = ?",
      [InventarioID]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Mensaje: "Error al eliminar inventario: no encontrado" });
    }

    res.json({ Mensaje: "Se eliminó correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
