const express = require('express');
const path = require('path');
const espaciosRoutes = require('./src/routes/espacios.routes');
const reservasRoutes = require('./src/routes/reservas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Interfaz web
app.use(express.static(path.join(__dirname, 'public')));

// Archivos CSS y otros archivos estáticos
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/espacios', espaciosRoutes);
app.use('/reservas', reservasRoutes);

// Ruta no encontrada (JSON, RNF1 y RNF4)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// JSON mal formado u otros errores (siempre JSON)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

module.exports = app;
