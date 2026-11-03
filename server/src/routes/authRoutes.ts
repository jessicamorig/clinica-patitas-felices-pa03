
import { Router } from 'express';

import {
  registrarUsuario,
  iniciarSesion
} from '../controllers/authController';

const router = Router();

// POST: registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// POST: iniciar sesión con JWT
router.post('/login', iniciarSesion);

export default router;
