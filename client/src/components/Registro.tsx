
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Registro() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const registrar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch(`${API_URL}/auth/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          password
        })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Error al registrarse')
      }

      // Después del registro, dirigirse al Login
      navigate('/login', {
        state: { mensaje: 'Cuenta creada. Ya puedes iniciar sesión.' }
      })

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error de conexión'
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-center text-2xl font-bold text-green-800">
        Regístrate
      </h2>

      <p className="mb-6 text-center text-gray-600">
        Crea tu cuenta en Clínica Patitas Felices
      </p>

      <form onSubmit={registrar} className="space-y-4">
        <label className="block">
          Nombre completo
          <input
            type="text"
            required
            maxLength={100}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </label>

        <label className="block">
          Correo electrónico
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </label>

        <label className="block">
          Contraseña
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </label>

        <label className="block">
          Confirmar contraseña
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-50"
        >
          {cargando ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="font-semibold text-green-700">
          Iniciar sesión
        </Link>
      </p>
    </section>
  )
}
