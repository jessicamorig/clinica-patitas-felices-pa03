
export const Pagina404 = () => {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        <div className="text-7xl mb-6">
          🐾
        </div>

        <h1 className="text-8xl font-bold text-green-800">
          404
        </h1>

        <h2 className="text-3xl font-bold text-green-900 mt-5">
          ¡Ups! Esta página se perdió
        </h2>

        <p className="text-gray-600 mt-4 mb-8">
          Parece que nuestra mascota exploradora
          tomó el camino equivocado.
          ¡Regresemos juntos al inicio!
        </p>

        <a
          href="/"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition"
        >
          🏠 Volver al inicio
        </a>

      </div>
    </main>
  )
}
