
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Servicio } from '../models/Servicio';

// GET: Listar todos los servicios
export const listarServicios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const servicios = await Servicio.find().sort({ nombre: 1 });

    res.status(200).json(servicios);
  } catch (error) {
    console.error('Error al listar servicios:', error);
    res.status(500).json({
      mensaje: 'Error al obtener los servicios'
    });
  }
};

// POST: Crear un servicio
export const crearServicio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, descripcion, precio, duracion, estado } = req.body;

    if (
      typeof nombre !== 'string' ||
      typeof descripcion !== 'string' ||
      typeof precio !== 'number' ||
      !Number.isFinite(precio) ||
      typeof duracion !== 'string' ||
      !nombre.trim() ||
      !descripcion.trim() ||
      !duracion.trim() ||
      precio < 0 ||
      (estado !== undefined &&
        !['Disponible', 'No disponible'].includes(estado))
    ) {
      res.status(400).json({
        mensaje: 'Datos del servicio inválidos'
      });
      return;
    }

    const nuevoServicio = await Servicio.create({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      duracion: duracion.trim(),
      estado: estado ?? 'Disponible'
    });

    res.status(201).json({
      mensaje: 'Servicio creado correctamente',
      servicio: nuevoServicio
    });

  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({
      mensaje: 'Error al crear el servicio'
    });
  }
};

// DELETE: Eliminar un servicio
export const eliminarServicio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        mensaje: 'Identificador inválido'
      });
      return;
    }

    const servicio = await Servicio.findByIdAndDelete(id);

    if (!servicio) {
      res.status(404).json({
        mensaje: 'Servicio no encontrado'
      });
      return;
    }

    res.status(200).json({
      mensaje: 'Servicio eliminado correctamente'
    });

  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({
      mensaje: 'Error al eliminar el servicio'
    });
  }
};
