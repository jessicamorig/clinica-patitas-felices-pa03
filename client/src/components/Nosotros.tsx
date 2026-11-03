import nosotros from '../assets/nosotros.png'

export const Nosotros = () => {
  return (
    <section id="nosotros" className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <img
            src={nosotros}
            alt="Veterinaria atendiendo una mascota"
            className="w-full h-80 object-cover rounded-2xl shadow-md"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            Sobre Nosotros
          </h2>

          <p className="text-gray-600 mb-4">
            En Clínica Patitas Felices cuidamos la salud y el bienestar de cada mascota con responsabilidad y cariño.
          </p>

          <p className="text-gray-600 mb-6">
            Contamos con atención veterinaria profesional y un ambiente pensado para que nuestros pacientes se sientan seguros y tranquilos.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
            Conócenos
          </button>
        </div>

      </div>
    </section>
  )
}