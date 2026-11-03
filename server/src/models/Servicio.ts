
import mongoose, { Schema, Document } from 'mongoose';

export interface IServicio extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  estado: string;
}

const servicioSchema = new Schema<IServicio>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    duracion: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      enum: ['Disponible', 'No disponible'],
      default: 'Disponible'
    }
  },
  {
    timestamps: true
  }
);

export const Servicio = mongoose.model<IServicio>(
  'Servicio',
  servicioSchema
);
