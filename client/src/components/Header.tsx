
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const {
    usuario,
    estaAutenticado,
    esAdmin,
    cerrarSesion
  } = useAuth()

  const navigate = useNavigate()

  const cerrarMenu = () => setMenuAbierto(false)

  const salir = () => {
    cerrarSesion()
    cerrarMenu()
    navigate('/login')
  }

  const enlaces = [
    { nombre: 'Inicio', destino: '/#inicio' },
    { nombre: 'Servicios', destino: '/#servicios' },
    { nombre: 'Tarifario', destino: '/#tarifario' },
    { nombre: 'Nosotros', destino: '/#nosotros' },
    { nombre: 'Contacto', destino: '/#contacto' }
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/#inicio" onClick={cerrarMenu} className="shrink-0">
          <h1 className="text-xl font-bold text-green-800">
            🐾 Patitas Felices
          </h1>
          <p className="text-sm text-gray-500">
            Clínica Veterinaria
          </p>
        </Link>

        {/* Menú para computadoras */}
        <nav className="hidden lg:flex items-center gap-5 text-sm text-gray-700 font-medium">
          {enlaces.map(enlace => (
            <Link
              key={enlace.nombre}
              to={enlace.destino}
              className="hover:text-green-600 transition-colors"
            >
              {enlace.nombre}
            </Link>
          ))}
        </nav>

        {/* Accesos para computadoras */}
        <div className="hidden lg:flex items-center gap-3">

          {!estaAutenticado ? (
            <>
              <Link
                to="/login"
                className="text-green-800 font-semibold hover:text-green-600"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/registro"
                className="border border-green-600 text-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-50"
              >
                Regístrate
              </Link>
            </>
          ) : (
            <>
              {esAdmin && (
                <Link
                  to="/admin"
                  className="text-green-800 font-semibold hover:text-green-600"
                >
                  Panel administrativo
                </Link>
              )}

              <span className="text-sm text-gray-600">
                Hola, {usuario?.nombre}
              </span>

              <button
                type="button"
                onClick={salir}
                className="text-red-700 font-medium hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </>
          )}

          <Link
            to="/#contacto"
            className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Agenda tu cita
          </Link>
        </div>

        {/* Botón para celulares y tabletas */}
        <button
          type="button"
          className="lg:hidden text-green-800 text-3xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú desplegable */}
      {menuAbierto && (
        <nav
          id="menu-movil"
          className="lg:hidden bg-green-50 px-6 py-5 flex flex-col gap-4 text-green-900 font-medium"
        >
          {enlaces.map(enlace => (
            <Link
              key={enlace.nombre}
              to={enlace.destino}
              onClick={cerrarMenu}
              className="hover:text-green-600"
            >
              {enlace.nombre}
            </Link>
          ))}

          {!estaAutenticado ? (
            <>
              <Link to="/login" onClick={cerrarMenu}>
                Iniciar sesión
              </Link>

              <Link
                to="/registro"
                onClick={cerrarMenu}
                className="border border-green-600 text-center px-5 py-3 rounded-xl"
              >
                Regístrate
              </Link>
            </>
          ) : (
            <>
              <span>Hola, {usuario?.nombre}</span>

              {esAdmin && (
                <Link to="/admin" onClick={cerrarMenu}>
                  Panel administrativo
                </Link>
              )}

              <button
                type="button"
                onClick={salir}
                className="text-left text-red-700"
              >
                Cerrar sesión
              </button>
            </>
          )}

          <Link
            to="/#contacto"
            onClick={cerrarMenu}
            className="bg-green-600 text-white text-center px-5 py-3 rounded-xl"
          >
            Agenda tu cita
          </Link>
        </nav>
      )}
    </header>
  )
}
