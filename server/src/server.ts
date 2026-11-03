
import { app } from './app';
import { config } from './config/env';
import { conectarMongoDB } from './config/mongodb';

const PORT = config.port;
const HOST = process.env.IP || '::';

const startServer = async () => {
  try {
    // PASO 1: Conectar con MongoDB mediante Mongoose
    await conectarMongoDB();

    console.log('MongoDB listo para utilizar Mongoose');

    // PASO 2: Iniciar servidor Express
    app.listen(PORT, HOST, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
