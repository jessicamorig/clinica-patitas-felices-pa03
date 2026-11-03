
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'node:path';

import authRoutes from './routes/authRoutes';
import serviciosRoutes from './routes/serviciosRoutes';

export const app = express();

// Configuración de Express
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de servicios veterinarios
app.use('/servicios', serviciosRoutes);

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    mensaje: 'API de Clínica Patitas Felices funcionando'
  });
});

// Archivos de React en producción
const carpetaFrontend = '/home/jessy301610/www';

app.use(express.static(carpetaFrontend));

// Permitir que React Router maneje las rutas
app.get('/{*ruta}', (req: Request, res: Response) => {
  res.sendFile(path.join(carpetaFrontend, 'index.html'));
});
