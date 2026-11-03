
import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: 'usuario' | 'admin';
};

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  iniciarSesion: (usuario: Usuario, token: string) => void;
  cerrarSesion: () => void;
  estaAutenticado: boolean;
  esAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const iniciarSesion = (
    datosUsuario: Usuario,
    nuevoToken: string
  ) => {
    setUsuario(datosUsuario);
    setToken(nuevoToken);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        iniciarSesion,
        cerrarSesion,
        estaAutenticado: Boolean(usuario && token),
        esAdmin: usuario?.rol === 'admin' && Boolean(token)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    );
  }

  return contexto;
}
