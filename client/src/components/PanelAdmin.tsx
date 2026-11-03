
import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Servicio = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  estado: string;
};

type Formulario = {
  nombre: string;
  descripcion: string;
  precio: string;
  duracion: string;
  estado: string;
};

const formularioInicial: Formulario = {
  nombre: '',
  descripcion: '',
  precio: '',
  duracion: '',
  estado: 'Disponible'
};

export default function PanelAdmin() {
  const { usuario, token, cerrarSesion } = useAuth();
  const navigate = useNavigate();

const salir = () => {
  cerrarSesion();
  navigate('/login', { replace: true });
};

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formulario, setFormulario] =
    useState<Formulario>(formularioInicial);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function cargarServicios() {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`${API_URL}/servicios`);

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los servicios');
      }

      const datos = await respuesta.json();

      if (!Array.isArray(datos)) {
        throw new Error('Respuesta de servicios inválida');
      }

      setServicios(datos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error de conexión'
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargarServicios();
  }, []);

  async function crearServicio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setMensaje('');

    const precio = Number(formulario.precio);

    if (
      !formulario.nombre.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.duracion.trim() ||
      formulario.precio.trim() === '' ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      setError('Completa correctamente todos los campos');
      return;
    }

    setGuardando(true);

    try {
      const respuesta = await fetch(`${API_URL}/servicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formulario.nombre.trim(),
          descripcion: formulario.descripcion.trim(),
          precio,
          duracion: formulario.duracion.trim(),
          estado: formulario.estado
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Error al crear servicio');
      }

      setFormulario(formularioInicial);
      await cargarServicios();
      setMensaje('Servicio creado correctamente');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al guardar'
      );
    } finally {
      setGuardando(false);
    }
  }

  async function eliminarServicio(servicio: Servicio) {
    const confirmar = window.confirm(
      `¿Deseas eliminar el servicio "${servicio.nombre}"?`
    );

    if (!confirmar) return;

    setError('');
    setMensaje('');

    try {
      const respuesta = await fetch(
        `${API_URL}/servicios/${servicio._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || 'No se pudo eliminar el servicio'
        );
      }

      await cargarServicios();
      setMensaje('Servicio eliminado correctamente');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al eliminar'
      );
    }
  }

  return (
    <main className="min-h-screen bg-green-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Panel administrativo
            </h1>
            <p className="text-gray-600">
              Bienvenido, {usuario?.nombre}
            </p>
          </div>

          <button
            onClick={salir}
            className="rounded-lg bg-gray-700 px-5 py-2 text-white"
          >
            Cerrar sesión
          </button>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        {mensaje && (
          <p role="status" className="rounded-lg bg-green-100 p-3 text-green-800">
            {mensaje}
          </p>
        )}

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold text-green-800">
            Registrar nuevo servicio
          </h2>

          <form onSubmit={crearServicio} className="grid gap-4 md:grid-cols-2">
            {(['nombre', 'descripcion', 'precio', 'duracion'] as const).map(
              (campo) => (
                <label key={campo} className="block">
                  <span className="mb-1 block capitalize">
                    {campo}
                  </span>
                  <input
                    required
                    type={campo === 'precio' ? 'number' : 'text'}
                    min={campo === 'precio' ? 0 : undefined}
                    step={campo === 'precio' ? '0.01' : undefined}
                    value={formulario[campo]}
                    onChange={(e) =>
                      setFormulario((anterior) => ({
                        ...anterior,
                        [campo]: e.target.value
                      }))
                    }
                    className="w-full rounded-lg border p-3"
                  />
                </label>
              )
            )}

            <label>
              <span className="mb-1 block">Estado</span>
              <select
                value={formulario.estado}
                onChange={(e) =>
                  setFormulario((anterior) => ({
                    ...anterior,
                    estado: e.target.value
                  }))
                }
                className="w-full rounded-lg border p-3"
              >
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={guardando}
                className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : 'Guardar servicio'}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-green-800">
            Servicios registrados ({servicios.length})
          </h2>

          {cargando ? (
            <p>Cargando servicios...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="p-3">Servicio</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3">Duración</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((servicio) => (
                    <tr key={servicio._id} className="border-b">
                      <td className="p-3">{servicio.nombre}</td>
                      <td className="p-3">
                        S/ {Number(servicio.precio).toFixed(2)}
                      </td>
                      <td className="p-3">{servicio.duracion}</td>
                      <td className="p-3">{servicio.estado}</td>
                      <td className="p-3">
                        <button
                          onClick={() => void eliminarServicio(servicio)}
                          className="rounded bg-red-600 px-3 py-2 text-white"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
