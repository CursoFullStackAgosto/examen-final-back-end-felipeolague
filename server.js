require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.use('/api/tasks', tasksRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 👌');
});

// Conectar base de datos y levantar servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
