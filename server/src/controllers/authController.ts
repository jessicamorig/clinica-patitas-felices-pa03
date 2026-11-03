
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const registrarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    // Validar los datos recibidos
    if (
      typeof nombre !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !nombre.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 8
    ) {
      res.status(400).json({
        mensaje: 'Ingresa nombre, correo válido y contraseña de al menos 8 caracteres'
      });
      return;
    }

    const emailNormalizado = email.trim().toLowerCase();

    // Comprobar que el correo no esté registrado
    const usuarioExistente = await Usuario.findOne({
      email: emailNormalizado
    });

    if (usuarioExistente) {
      res.status(409).json({
        mensaje: 'El correo electrónico ya está registrado'
      });
      return;
    }

    // Crear hash seguro de la contraseña
    const passwordHash = await bcrypt.hash(password, 12);

    // Guardar el usuario en MongoDB
    const nuevoUsuario = await Usuario.create({
      nombre: nombre.trim(),
      email: emailNormalizado,
      password: passwordHash,
      rol: 'usuario'
    });

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error: unknown) {
    // Controlar también un correo duplicado por concurrencia
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        mensaje: 'El correo electrónico ya está registrado'
      });
      return;
    }

    console.error('Error al registrar usuario:', error);

    res.status(500).json({
      mensaje: 'Error interno al registrar el usuario'
    });
  }
};


// Iniciar sesión y generar un token JWT
export const iniciarSesion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar datos recibidos
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios'
      });
      return;
    }

    // Buscar usuario incluyendo el hash de contraseña
    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase()
    }).select('+password');

    if (!usuario) {
      res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
      return;
    }

    // Comparar contraseña con el hash almacenado
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
      return;
    }

    // Obtener clave secreta desde .env
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT_SECRET no está configurada');
      res.status(500).json({
        mensaje: 'Error de configuración del servidor'
      });
      return;
    }

    // Generar token de acceso
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    res.status(500).json({
      mensaje: 'Error interno al iniciar sesión'
    });
  }
};
