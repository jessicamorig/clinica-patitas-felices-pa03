export const Proceso = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900">
            Nuestro Proceso de Atención
          </h2>

          <p className="text-gray-600 mt-4">
            Te acompañamos en cada paso para cuidar a tu mascota.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="text-center bg-green-50 p-8 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">
              1
            </div>

            <h3 className="text-xl font-bold text-green-900 mb-3">
              Reserva tu cita
            </h3>

            <p className="text-gray-600">
              Elige el horario que mejor se adapte a ti y a tu mascota.
            </p>
          </div>

          <div className="text-center bg-green-50 p-8 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">
              2
            </div>

            <h3 className="text-xl font-bold text-green-900 mb-3">
              Evaluación
            </h3>

            <p className="text-gray-600">
              Nuestro veterinario revisará el estado de salud de tu mascota.
            </p>
          </div>

          <div className="text-center bg-green-50 p-8 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">
              3
            </div>

            <h3 className="text-xl font-bold text-green-900 mb-3">
              Cuidado
            </h3>

            <p className="text-gray-600">
              Recibe el tratamiento y las recomendaciones necesarias.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}