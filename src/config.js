import { config } from "dotenv";
config();

export const BD_HOST = process.env.BD_HOST || "127.0.0.1";
export const BD_DATABASE = process.env.BD_DATABASE || "inventario";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
// export const CLOUDINARY_CLOUD_NAME =
//   process.env.CLOUDINARY_CLOUD_NAME || "bd_leccion";
// export const CLOUDINARY_API_KEY =
//   process.env.CLOUDINARY_API_KEY || "853357716749581";
// export const CLOUDINARY_API_SECRET =
//   process.env.CLOUDINARY_API_SECRET || "eFwU8D93mcMIC2xmyTLnih_GH8s";
