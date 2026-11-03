
import 'dotenv/config';
import mongoose from 'mongoose';

export const conectarMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('La variable MONGO_URI no está configurada');
    }

    await mongoose.connect(mongoURI);

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    throw error;
  }
};
