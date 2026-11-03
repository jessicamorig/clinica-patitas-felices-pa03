
import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'

type LoginProps = {
  onLoginExitoso?: (rol: 'usuario' | 'admin') => void;
};

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Login({ onLoginExitoso }: LoginProps) {
  const { iniciarSesion } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const manejarLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Ingresa tu correo y contraseña');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || 'No se pudo iniciar sesión'
        );
      }

      if (!datos.token || !datos.usuario) {
        throw new Error('Respuesta de autenticación inválida');
      }

      iniciarSesion(datos.usuario, datos.token);
      setPassword('');
      onLoginExitoso?.(datos.usuario.rol);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error de conexión con el servidor'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-center text-2xl font-bold text-green-800">
        Iniciar sesión
      </h2>

      <p className="mb-6 text-center text-gray-600">
        Clínica Patitas Felices
      </p>

      <form onSubmit={manejarLogin} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1 block font-medium">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-lg border p-3"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block font-medium">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-lg border p-3"
          />
        </div>

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
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-600">
        ¿Todavía no tienes una cuenta?{' '}
        <Link
          to="/registro"
          className="font-semibold text-green-700 hover:underline"
        >
          Regístrate aquí
        </Link>
      </p>
      </section>
  );
}
