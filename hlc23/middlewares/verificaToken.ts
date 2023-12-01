import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Usuario } from '../modelos/usuario.modelo'; // Asegúrate de importar tu modelo de Usuario aquí

dotenv.config();

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del encabezado 'x-token'
  const token = req.header('x-token');
  console.log("verificaToken"+token)

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token no proporcionado',
    });
  }

  // Verificar el token
  jwt.verify(token, process.env.CLAVE_SECRETA || '', async (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Token no válido',
      });
    }

    try {
      // Buscar al usuario en la base de datos utilizando el ID del token decodificado
      const usuario = await Usuario.findById(decoded.usuario._id);
     
      if (!usuario) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Usuario no encontrado',
        });
      }

      // Si la verificación es exitosa, el usuario está autenticado
      req.body.usuario = usuario;
      next();
    } catch (error) {
      console.error('Error al buscar usuario en la base de datos:', error);
      return res.status(500).json({
        ok: false,
        mensaje: 'Error interno del servidor',
      });
    }
  });
};
