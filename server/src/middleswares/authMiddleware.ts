
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface RequestAutenticado extends Request {
  usuario?: {
    id: string;
    rol: string;
  };
}

export const verificarToken = (
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
): void => {
  // Obtener encabezado Authorization
  const autorizacion = req.headers.authorization;

  if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
    res.status(401).json({
      mensaje: 'Acceso denegado. Token no proporcionado'
    });
    return;
  }

  const token = autorizacion.slice(7);
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({
      mensaje: 'Error de configuración del servidor'
    });
    return;
  }

  try {
    // Verificar firma y fecha de vencimiento
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === 'string' ||
      !decoded.id ||
      typeof decoded.id !== 'string' ||
      !['usuario', 'admin'].includes(decoded.rol)
    ) {
      res.status(401).json({
        mensaje: 'Token inválido'
      });
      return;
    }

    // Guardar datos del usuario autenticado
    req.usuario = {
      id: decoded.id,
      rol: decoded.rol
    };

    next();

  } catch (error) {
    res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};


export const verificarAdmin = (
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
): void => {
  if (!req.usuario) {
    res.status(401).json({
      mensaje: 'Debes iniciar sesión'
    });
    return;
  }

  if (req.usuario.rol !== 'admin') {
    res.status(403).json({
      mensaje: 'Acceso restringido a administradores'
    });
    return;
  }

  next();
};
