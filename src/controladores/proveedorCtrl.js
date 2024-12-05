import { conmysql } from "../db.js";

export const listarProveedor = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM proveedor;");

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

export const getProveedorID = async (req, res) => {
  try {
    const { ProveedorID } = req.body;

    if (!ProveedorID) {
      return res.status(400).json({
        Mensaje: "Error: El ProveedorID es requerido",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM proveedor WHERE ProveedorID = ?;",
      [ProveedorID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el proveedor"
          : "No se encontró el proveedor",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertProveedor = async (req, res) => {
  try {
    const { Nombre, Contacto, Telefono, Email } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO proveedor (Nombre, Contacto, Telefono, Email) 
      VALUES (?, ?, ?, ?);
      `,
      [Nombre, Contacto, Telefono, Email]
    );

    res.json({
      Mensaje: "Se guardó correctamente",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const { ProveedorID, Nombre, Contacto, Telefono, Email } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE proveedor 
      SET Nombre = ?, Contacto = ?, Telefono = ?, Email = ? 
      WHERE ProveedorID = ?;
      `,
      [Nombre, Contacto, Telefono, Email, ProveedorID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Proveedor no encontrado",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarProveedor = async (req, res) => {
  try {
    const { ProveedorID } = req.body;

    const [result] = await conmysql.query(
      "DELETE FROM proveedor WHERE ProveedorID = ?;",
      [ProveedorID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error al eliminar proveedor: no encontrado",
      });
    }

    res.json({
      Mensaje: "Se eliminó correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
