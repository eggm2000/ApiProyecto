import { conmysql } from "../db.js";

export const listarProducto = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT * FROM producto;
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
    return res.status(500).json({ message: error.message });
  }
};

export const getProductoID = async (req, res) => {
  try {
    console.log("Datos recibidos en req.body:", req.body); // Verifica qué datos llegan aquí

    const { productoID } = req.body;

    if (!productoID) {
      return res.status(400).json({
        Mensaje: "Error: El producto es requerido",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM producto WHERE ProductoID = ?;",
      [productoID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el Producto"
          : "No se encontró el Producto",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, proveedorId } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO producto (Nombre, Descripcion, Precio, ProveedorId) 
      VALUES (?, ?, ?, ?);
      `,
      [nombre, descripcion, precio, proveedorId]
    );

    res.json({
      Mensaje: "Se guardó correctamente",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { productoID, nombre, descripcion, precio, proveedorId } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE producto 
      SET Nombre = ?, Descripcion = ?, Precio = ?, ProveedorId = ? 
      WHERE ProductoID = ?;
      `,
      [nombre, descripcion, precio, proveedorId, productoID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Producto no encontrado",
      });
    }

    res.json({ Mensaje: "Se actualizó correctamente Producto" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { productoID } = req.body;

    const [result] = await conmysql.query(
      "DELETE FROM producto WHERE ProductoID = ?;",
      [productoID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error al eliminar Producto: no encontrado",
      });
    }

    res.json({ Mensaje: "Se eliminó correctamente Producto" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
