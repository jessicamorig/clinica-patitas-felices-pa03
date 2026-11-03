
import { useQuery } from '@tanstack/react-query'

type Servicio = {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  duracion: string
  estado: string
}


const obtenerServicios = async (): Promise<Servicio[]> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const respuesta = await fetch(`${apiUrl}/servicios`)

  if (!respuesta.ok) {
    throw new Error('Error al obtener servicios')
  }

  return respuesta.json()
}


export const ServiciosTabla = () => {

  const {
    data: servicios = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['servicios'],
    queryFn: obtenerServicios
  })

  if (isLoading) {
    return <p className="text-center py-10">
      Cargando servicios...
    </p>
  }

  if (isError) {
    return <p className="text-center py-10 text-red-600">
      Error al cargar los servicios
    </p>
  }

  return (
    <section id="tarifario" className="py-20 bg-green-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-900">
            Tarifario de Servicios
          </h2>

          <p className="text-gray-600 mt-4">
            Conoce nuestros principales servicios veterinarios.
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full">

            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Servicio</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Duración</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>

            <tbody>
              {servicios.map((servicio) => (
                <tr
                  key={servicio._id}
                  className="border-b hover:bg-green-50"
                >
                  <td className="p-4 text-center">
                    {servicio._id}
                  </td>

                  <td className="p-4 font-semibold text-green-900">
                    {servicio.nombre}
                  </td>

                  <td className="p-4">
                    {servicio.descripcion}
                  </td>

                  <td className="p-4 text-center">
                    S/ {servicio.precio}
                  </td>

                  <td className="p-4 text-center">
                    {servicio.duracion}
                  </td>

                  <td className="p-4 text-center">
                    {servicio.estado}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </section>
  )
}
