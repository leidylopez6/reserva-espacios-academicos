const { espacios, reservas, contadores } = require('../data/datos');

const textoValido = (v) => typeof v === 'string' && v.trim() !== '';
const enteroPositivo = (v) => Number.isInteger(v) && v > 0;
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

function esFechaValida(fecha) {
  if (typeof fecha !== 'string' || !FECHA_RE.test(fecha)) return false;
  const [a, m, d] = fecha.split('-').map(Number);
  const f = new Date(Date.UTC(a, m - 1, d));
  return (
    f.getUTCFullYear() === a &&
    f.getUTCMonth() === m - 1 &&
    f.getUTCDate() === d
  );
}

// Valida el cuerpo de un espacio; devuelve mensaje de error o null
function validarEspacio(body) {
  const { nombre, ubicacion, capacidad } = body || {};
  if (
    !textoValido(nombre) ||
    !textoValido(ubicacion) ||
    capacidad === undefined ||
    capacidad === null ||
    capacidad === ''
  ) {
    return 'Los campos nombre, ubicacion y capacidad son obligatorios';
  }
  if (!enteroPositivo(capacidad)) {
    return 'capacidad debe ser un número entero mayor que 0';
  }
  const { descripcion, imagen, tipo } = body;
  if (
    (tipo !== undefined && typeof tipo !== 'string') ||
    (descripcion !== undefined && typeof descripcion !== 'string') ||
    (imagen !== undefined && typeof imagen !== 'string')
  ) {
    return 'tipo, descripcion e imagen deben ser texto';
  }
  return null;
}

function listar(req, res) {
  res.status(200).json(espacios);
}

function obtener(req, res) {
  const espacio = espacios.find((e) => e.id === Number(req.params.id));
  if (!espacio) return res.status(404).json({ error: 'Espacio no encontrado' });
  res.status(200).json(espacio);
}

function crear(req, res) {
  const error = validarEspacio(req.body);
  if (error) return res.status(400).json({ error });

  const {
    nombre,
    ubicacion,
    capacidad,
    tipo = '',
    descripcion = '',
    imagen = '',
  } = req.body;
  const nuevo = {
    id: contadores.espacio++,
    nombre: nombre.trim(),
    ubicacion: ubicacion.trim(),
    capacidad,
    tipo: tipo.trim(),
    descripcion: descripcion.trim(),
    imagen: imagen.trim(),
  };
  espacios.push(nuevo);
  res.status(201).json(nuevo);
}

function editar(req, res) {
  const espacio = espacios.find((e) => e.id === Number(req.params.id));
  if (!espacio) return res.status(404).json({ error: 'Espacio no encontrado' });

  const error = validarEspacio(req.body);
  if (error) return res.status(400).json({ error });

  const {
    nombre,
    ubicacion,
    capacidad,
    tipo = '',
    descripcion = '',
    imagen = '',
  } = req.body;
  espacio.nombre = nombre.trim();
  espacio.ubicacion = ubicacion.trim();
  espacio.capacidad = capacidad;
  espacio.tipo = tipo.trim();
  espacio.descripcion = descripcion.trim();
  espacio.imagen = imagen.trim();
  res.status(200).json(espacio);
}

function eliminar(req, res) {
  const id = Number(req.params.id);
  const indice = espacios.findIndex((e) => e.id === id);
  if (indice === -1)
    return res.status(404).json({ error: 'Espacio no encontrado' });

  const tieneActivas = reservas.some(
    (r) => r.espacioId === id && r.estado === 'activa'
  );
  if (tieneActivas) {
    return res
      .status(409)
      .json({
        error: 'No se puede eliminar el espacio porque tiene reservas activas',
      });
  }

  const [eliminado] = espacios.splice(indice, 1);
  res.status(200).json({ mensaje: 'Espacio eliminado', espacio: eliminado });
}

function disponibilidad(req, res) {
  const id = Number(req.params.id);
  const { fecha } = req.query;

  if (!fecha) {
    return res
      .status(400)
      .json({ error: 'El parámetro fecha es obligatorio (AAAA-MM-DD)' });
  }
  if (!esFechaValida(fecha)) {
    return res
      .status(400)
      .json({ error: 'El formato de fecha debe ser AAAA-MM-DD' });
  }

  const espacio = espacios.find((e) => e.id === id);
  if (!espacio) return res.status(404).json({ error: 'Espacio no encontrado' });

  const ocupados = reservas
    .filter(
      (r) => r.espacioId === id && r.fecha === fecha && r.estado === 'activa'
    )
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
    .map((r) => ({
      reservaId: r.id,
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
    }));

  res.status(200).json({ espacioId: id, fecha, ocupados });
}

module.exports = {
  listar,
  obtener,
  crear,
  editar,
  eliminar,
  disponibilidad,
  esFechaValida,
};
