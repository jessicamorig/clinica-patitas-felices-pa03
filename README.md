
# Clínica Veterinaria Patitas Felices 🐾

## Proceso de Aprendizaje 03 – Programación Web Avanzada

### Descripción del proyecto

Clínica Patitas Felices es una aplicación web para presentar
servicios veterinarios y administrar un tarifario mediante
una base de datos MongoDB.

La aplicación permite registrar usuarios, iniciar sesión y
gestionar servicios mediante una API REST protegida con JWT.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Context API

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

## Funcionalidades

### Página pública
- Presentación de la clínica veterinaria.
- Información de servicios.
- Tarifario conectado a MongoDB.
- Navegación por las secciones de la página.
- Formularios de registro e inicio de sesión.

### Autenticación
- Registro de usuarios.
- Contraseñas protegidas mediante bcryptjs.
- Inicio de sesión con JWT.
- Diferenciación de roles usuario y administrador.
- Cierre de sesión.

### Panel administrativo
- Consulta de servicios.
- Registro de nuevos servicios.
- Eliminación de servicios.
- Acceso restringido a administradores.

## Estructura del proyecto

clinica_patitas_felices_PA03/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
├── .gitignore
└── README.md

## Instalación

### Requisitos previos

- Node.js y npm
- MongoDB local
- Git
- Visual Studio Code

### 1. Configurar backend

Entrar a la carpeta server:

cd server

Instalar dependencias:

npm install

Crear el archivo .env utilizando .env.example.

Configurar PORT, MONGO_URI y JWT_SECRET.

Iniciar el servidor:

npm run dev

### 2. Configurar frontend

En otra terminal:

cd client

Instalar dependencias:

npm install

Crear el archivo .env utilizando .env.example.

Configurar VITE_API_URL con la dirección del backend.

Iniciar React:

npm run dev

Abrir la dirección local mostrada por Vite.

## API REST

| Método | Endpoint | Acceso |
|--------|----------|--------|
| GET | /servicios | Público |
| POST | /servicios | Administrador |
| DELETE | /servicios/:id | Administrador |
| POST | /auth/registro | Público |
| POST | /auth/login | Público |

## Seguridad

- Contraseñas almacenadas mediante hash bcrypt.
- Autenticación mediante JWT.
- Middleware de validación de tokens.
- Restricción de operaciones administrativas por rol.
- Variables privadas almacenadas en archivos .env.
- Archivos .env excluidos de Git mediante .gitignore.

## Pruebas realizadas

- Consulta de servicios mediante GET: HTTP 200.
- Creación de servicios mediante POST: HTTP 201.
- Eliminación de servicios mediante DELETE: HTTP 200.
- Solicitudes sin JWT rechazadas: HTTP 401.
- Usuarios sin permisos rechazados: HTTP 403.
- Registro e inicio de sesión verificados.
- Integración de React con MongoDB comprobada.

## Base de datos

Base de datos local: patitas_felices_pa03

Colecciones:
- servicios
- usuarios

Los servicios se almacenan mediante documentos MongoDB.
Las cuentas registradas incluyen roles usuario y admin.

## Consideraciones

El JWT se conserva temporalmente en memoria durante
la sesión de React. Al actualizar la página, el usuario
debe iniciar sesión nuevamente.

La cuenta administradora se configura de manera
controlada para el entorno de pruebas. El registro
público asigna únicamente el rol usuario.

## Evidencias

Las evidencias incluyen:
- Página principal de la clínica.
- Tarifario de servicios.
- Registro de usuarios.
- Inicio de sesión.
- Panel administrativo.
- Colecciones de MongoDB.
- Pruebas GET, POST y DELETE.
- Validaciones de seguridad JWT.

## Proyecto académico

Proyecto desarrollado para el Proceso de Aprendizaje 03
del curso Programación Web Avanzada.
