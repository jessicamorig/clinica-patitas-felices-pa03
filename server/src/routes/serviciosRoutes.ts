
import { Router } from 'express';

import {
  listarServicios,
  crearServicio,
  eliminarServicio
} from '../controllers/serviciosController';

import {
  verificarToken,
  verificarAdmin
} from '../middleswares/authMiddleware';

const router = Router();

// GET: público, permite consultar el tarifario
router.get('/', listarServicios);

// POST: solo administradores
router.post('/', verificarToken, verificarAdmin, crearServicio);

// DELETE: solo administradores
router.delete('/:id', verificarToken, verificarAdmin, eliminarServicio);

export default router;
