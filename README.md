# Proyecto Final - API REST con Node.js

Este proyecto es una API REST que permite registrar usuarios, iniciar sesión y administrar tareas (crear, ver, actualizar y eliminar). Incluye autenticación con JWT y guarda los datos en una base de datos SQLite.

## Autor

Felipe Olagüe  
Curso Full Stack Agosto  
Organización: CursoFullStackAgosto

---

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize (con SQLite)
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/CursoFullStackAgosto/examen-final-back-end-felipeolague.git
cd examen-final-back-end-felipeolague
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Crear el archivo .env en la raíz del proyecto
```bash
PORT=3000
DATABASE_URL=sqlite://./database.sqlite
JWT_SECRET=1234
```

### 4. Ejecutar el servidor
```bash
node server.js
```

El servidor estará disponible en:
http://localhost:3000

## Endpoints disponibles

### 🔐 Autenticación

- `POST /api/auth/register` → Registro de usuario
- `POST /api/auth/login` → Login (devuelve token)
- `GET /api/auth/perfil` → Ruta protegida (requiere token)

### ✅ Tareas (requiere token JWT)

- `POST /api/tasks` → Crear tarea
- `GET /api/tasks` → Ver todas las tareas
- `GET /api/tasks/:id` → Ver una tarea específica
- `PUT /api/tasks/:id` → Editar una tarea
- `DELETE /api/tasks/:id` → Eliminar una tarea

