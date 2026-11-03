export const Servicios = () => {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900">
            Nuestros Servicios
          </h2>

          <p className="text-gray-600 mt-4">
            Cuidamos a tu mascota con atención profesional y mucho cariño.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">🩺</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Consulta
            </h3>
            <p className="text-gray-600">
              Evaluación general para cuidar la salud de tu mascota.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">💉</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Vacunación
            </h3>
            <p className="text-gray-600">
              Protección y prevención contra diferentes enfermedades.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Cirugía
            </h3>
            <p className="text-gray-600">
              Procedimientos realizados con seguridad y cuidado.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4">🛁</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Baño y Estética
            </h3>
            <p className="text-gray-600">
              Higiene y cuidado para que tu mascota luzca saludable.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}