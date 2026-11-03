export const Testimonios = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900">
            Lo que dicen nuestros clientes
          </h2>

          <p className="text-gray-600 mt-4">
            La confianza de nuestros clientes es muy importante para nosotros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm">
            <p className="text-gray-600 mb-4">
              Excelente atención. Trataron a mi perrito con mucho cariño y paciencia.
            </p>

            <h3 className="font-bold text-green-900">
              María López
            </h3>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm">
            <p className="text-gray-600 mb-4">
              Muy buena atención y explicación clara del tratamiento de mi gatita.
            </p>

            <h3 className="font-bold text-green-900">
              Carlos Ramírez
            </h3>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-sm">
            <p className="text-gray-600 mb-4">
              El personal es muy amable y las instalaciones se encuentran muy limpias.
            </p>

            <h3 className="font-bold text-green-900">
              Andrea Torres
            </h3>
          </div>

        </div>

      </div>
    </section>
  )
}