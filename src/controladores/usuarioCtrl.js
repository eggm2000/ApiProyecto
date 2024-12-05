import { conmysql } from "../db.js";

export const listarUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM usuario;");

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

export const getUsuarioID = async (req, res) => {
  try {
    const { UsuarioID } = req.body;

    if (!UsuarioID) {
      return res.status(400).json({
        Mensaje: "Error: El UsuarioID es requerido",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM usuario WHERE UsuarioID = ?;",
      [UsuarioID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el usuario"
          : "No se encontró el usuario",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertUsuario = async (req, res) => {
  try {
    const { Nombre, usuario, password, Admin } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO usuario (Nombre, usuario, password, Admin) 
      VALUES (?, ?, ?, ?);
      `,
      [Nombre, usuario, password, Admin]
    );

    res.json({
      Mensaje: "Se guardó correctamente",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { UsuarioID, Nombre, usuario, password, Admin } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE usuario 
      SET Nombre = ?, usuario = ?, password = ?, Admin = ? 
      WHERE UsuarioID = ?;
      `,
      [Nombre, usuario, password, Admin, UsuarioID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Usuario no encontrado",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { UsuarioID } = req.body;

    const [result] = await conmysql.query(
      "DELETE FROM usuario WHERE UsuarioID = ?;",
      [UsuarioID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error al eliminar usuario: no encontrado",
      });
    }

    res.json({
      Mensaje: "Se eliminó correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { Usuario, Password } = req.body;

    if (!Usuario) {
      return res.status(400).json({
        Mensaje: "Error: El Usuario es requerido",
        cantidad: 0,
        data: [],
      });
    }

    if (!Password) {
      return res.status(400).json({
        Mensaje: "Error: La contraseña es requerida",
        cantidad: 0,
        data: [],
      });
    }

    const [result] = await conmysql.query(
      `
      SELECT UsuarioID, Nombre, usuario, password, Admin 
      FROM usuario 
      WHERE usuario = ? AND password = ?;
      `,
      [Usuario, Password]
    );

    res.json({
      Mensaje: result.length > 0 ? "Se inició sesión" : "Credenciales erróneas",
      cantidad: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
