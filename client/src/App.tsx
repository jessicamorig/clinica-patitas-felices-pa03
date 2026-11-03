
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Banner } from './components/Banner'
import { Servicios } from './components/Servicios'
import { Nosotros } from './components/Nosotros'
import { Equipo } from './components/Equipo'
import { Proceso } from './components/Proceso'
import { Galeria } from './components/Galeria'
import { ServiciosTabla } from './components/ServiciosTabla'
import { Testimonios } from './components/Testimonios'
import { Contacto } from './components/Contacto'
import { Footer } from './components/Footer'
import { Pagina404 } from './components/Pagina404'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PanelAdmin from './components/PanelAdmin'
import Registro from './components/Registro'
import ScrollToHash from './components/ScrollToHash'


// Formulario de inicio de sesión
import Login from './components/Login'

// Página principal
function Inicio() {
  return (
    <>
      <Header />
      <Banner />
      <Servicios />
      <Nosotros />
      <Equipo />
      <Proceso />
      <Galeria />
      <ServiciosTabla />
      <Testimonios />
      <Contacto />
      <Footer />
    </>
  )
}

// Página de acceso

function PaginaLogin() {
  const navigate = useNavigate()
  
  const manejarLoginExitoso = (rol: 'usuario' | 'admin') => {
  navigate(rol === 'admin' ? '/admin' : '/')
}

  return (
    <div className="min-h-screen bg-green-50">
      <Header />

      <main className="px-4 py-16">
        <Login onLoginExitoso={manejarLoginExitoso} />
      </main>

      <Footer />
    </div>
  )
}


function PaginaRegistro() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />

      <main className="px-4 py-16">
        <Registro />
      </main>

      <Footer />
    </div>
  )
}


// Rutas de la aplicación
function App() {
  return (
    <BrowserRouter>
    <ScrollToHash />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/admin" element={<RutaAdmin />} />
        <Route path="*" element={<Pagina404 />} />
        <Route path="/registro" element={<PaginaRegistro />} />
      </Routes>
    </BrowserRouter>
  )
}


function RutaAdmin() {
  const { estaAutenticado, esAdmin } = useAuth()

  if (!estaAutenticado || !esAdmin) {
    return <Navigate to="/login" replace />
  }

  return <PanelAdmin />
}


export default App


