import equipo1 from '../assets/equipo1.png'
import equipo2 from '../assets/equipo2.png'
import equipo3 from '../assets/equipo3.png'

export const Equipo = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900">
            Nuestro Equipo
          </h2>

          <p className="text-gray-600 mt-4">
            Profesionales comprometidos con el bienestar de tus mascotas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="text-center">
            <img
              src={equipo2}
              alt="Veterinaria"
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />

            <h3 className="text-xl font-bold text-green-900 mt-5">
              Dra. Ana Torres
            </h3>

            <p className="text-gray-600">
              Medicina Veterinaria
            </p>
          </div>

          <div className="text-center">
            <img
              src={equipo1}
              alt="Veterinario"
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />

            <h3 className="text-xl font-bold text-green-900 mt-5">
              Dr. Luis Ramos
            </h3>

            <p className="text-gray-600">
              Cirugía Veterinaria
            </p>
          </div>

          <div className="text-center">
            <img
              src={equipo3}
              alt="Veterinaria"
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />

            <h3 className="text-xl font-bold text-green-900 mt-5">
              Dra. Carla Díaz
            </h3>

            <p className="text-gray-600">
              Cuidado y Prevención
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}