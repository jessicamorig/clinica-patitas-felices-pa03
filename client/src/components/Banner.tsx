import banner from '../assets/Banner.png'

export const Banner = () => {
  return (
    <section id="inicio" className="bg-green-50">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">

        <div>
          <h2 className="text-5xl font-bold text-green-900 mb-6">
            Cuidamos lo que más amas
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Salud, bienestar y felicidad para tus mascotas en cada etapa de su vida.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
            Agenda tu cita
          </button>
        </div>

        <div>
            <img
              src={banner}
              alt="Perro y gato"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>

      </div>
    </section>
  )
}