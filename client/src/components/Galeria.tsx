import galeria1 from '../assets/galeria1.png'
import galeria2 from '../assets/galeria2.png'
import galeria3 from '../assets/galeria3.png'
import galeria4 from '../assets/galeria4.png'
import galeria5 from '../assets/galeria5.png'
import galeria6 from '../assets/galeria6.png'

export const Galeria = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900">
            Nuestros Pacientes
          </h2>

          <p className="text-gray-600 mt-4">
            Algunas de las mascotas que atendemos en Patitas Felices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <img
            src={galeria1}
            alt="Mascota 1"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

          <img
            src={galeria2}
            alt="Mascota 2"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

          <img
            src={galeria3}
            alt="Mascota 3"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

          <img
            src={galeria4}
            alt="Mascota 4"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

          <img
            src={galeria5}
            alt="Mascota 5"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

          <img
            src={galeria6}
            alt="Mascota 6"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />

        </div>

      </div>
    </section>
  )
}