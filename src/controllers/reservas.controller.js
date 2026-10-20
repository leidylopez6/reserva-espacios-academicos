const { espacios, reservas, contadores } = require('../data/datos');
const { esFechaValida } = require('./espacios.controller');

const HORA_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const textoValido = (v) => typeof v === 'string' && v.trim() !== '';

// Obtiene la fecha actual de Colombia
function obtenerFechaHoy() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const obtener = (tipo) => partes.find((parte) => parte.type === tipo).value;

  return `${obtener('year')}-${obtener('month')}-${obtener('day')}`;
}

// Obtiene la hora actual de Colombia en formato HH:MM
function obtenerHoraActual() {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const obtener = (tipo) => partes.find((parte) => parte.type === tipo).value;

  return `${obtener('hour')}:${obtener('minute')}`;
}

// Regla de solape: mismo espacio, misma fecha, inicio1 < fin2 y inicio2 < fin1.
// Las canceladas no bloquean. excluirId permite ignorar la propia reserva al editar.
function buscarSolape(
  { espacioId, fecha, horaInicio, horaFin },
  excluirId = null
) {
  return reservas.find(
    (r) =>
      r.estado === 'activa' &&
      r.id !== excluirId &&
      r.espacioId === espacioId &&
      r.fecha === fecha &&
      horaInicio < r.horaFin &&
      r.horaInicio < horaFin
  );
}

// Valida en orden: obligatorios (400), formatos (400), espacio existente (404), solape (409).
// Devuelve { status, error } o { datos } con los datos normalizados.
function validarReserva(body, excluirId = null) {
  const { espacioId, solicitante, fecha, horaInicio, horaFin } = body || {};

  // 1. Campos obligatorios
  if (
    espacioId === undefined ||
    espacioId === null ||
    espacioId === '' ||
    !textoValido(solicitante) ||
    !textoValido(fecha) ||
    !textoValido(horaInicio) ||
    !textoValido(horaFin)
  ) {
    return {
      status: 400,
      error:
        'Los campos espacioId, solicitante, fecha, horaInicio y horaFin son obligatorios',
    };
  }

  // 2. Formatos
  const idEspacio = Number(espacioId);
  if (!Number.isInteger(idEspacio)) {
    return { status: 400, error: 'espacioId debe ser un número' };
  }
  if (!esFechaValida(fecha)) {
    return { status: 400, error: 'El formato de fecha debe ser AAAA-MM-DD' };
  }
  // No permitir reservas para fechas anteriores a hoy
  if (fecha < obtenerFechaHoy()) {
    return {
      status: 400,
      error:
        'No puedes reservar un espacio para una fecha que ya pasó. Selecciona hoy o una fecha futura.',
    };
  }
  if (!HORA_RE.test(horaInicio) || !HORA_RE.test(horaFin)) {
    return {
      status: 400,
      error: 'El formato de hora debe ser HH:MM en 24 horas',
    };
  }
  // No permitir reservar hoy en una hora que ya pasó
  if (fecha === obtenerFechaHoy() && horaInicio <= obtenerHoraActual()) {
    return {
      status: 400,
      error:
        'La hora de inicio ya pasó. Selecciona una hora futura para realizar la reserva.',
    };
  }
  if (horaFin <= horaInicio) {
    return { status: 400, error: 'horaFin debe ser posterior a horaInicio' };
  }

  // 3. El espacio existe
  if (!espacios.some((e) => e.id === idEspacio)) {
    return { status: 404, error: 'El espacio indicado no existe' };
  }

  // 4. Sin solape
  const datos = {
    espacioId: idEspacio,
    solicitante: solicitante.trim(),
    fecha,
    horaInicio,
    horaFin,
  };
  const choque = buscarSolape(datos, excluirId);
  if (choque) {
    return {
      status: 409,
      error: `El espacio ya está reservado de ${choque.horaInicio} a ${choque.horaFin} en esa fecha`,
    };
  }

  return { datos };
}

function listar(req, res) {
  const { espacioId, solicitante, estado } = req.query;
  let resultado = reservas;

  if (espacioId !== undefined) {
    resultado = resultado.filter((r) => r.espacioId === Number(espacioId));
  }
  if (solicitante !== undefined) {
    const buscado = String(solicitante).trim().toLowerCase();
    resultado = resultado.filter(
      (r) => r.solicitante.toLowerCase() === buscado
    );
  }
  if (estado !== undefined) {
    if (!['activa', 'cancelada'].includes(estado)) {
      return res
        .status(400)
        .json({ error: 'estado debe ser "activa" o "cancelada"' });
    }
    resultado = resultado.filter((r) => r.estado === estado);
  }

  res.status(200).json(resultado);
}

function obtener(req, res) {
  const reserva = reservas.find((r) => r.id === Number(req.params.id));
  if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.status(200).json(reserva);
}

function crear(req, res) {
  const v = validarReserva(req.body);
  if (v.error) return res.status(v.status).json({ error: v.error });

  const nueva = { id: contadores.reserva++, ...v.datos, estado: 'activa' };
  reservas.push(nueva);
  res.status(201).json(nueva);
}

function editar(req, res) {
  const reserva = reservas.find((r) => r.id === Number(req.params.id));
  if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
  if (reserva.estado === 'cancelada') {
    return res
      .status(409)
      .json({ error: 'No se puede editar una reserva cancelada' });
  }

  const v = validarReserva(req.body, reserva.id);
  if (v.error) return res.status(v.status).json({ error: v.error });

  Object.assign(reserva, v.datos); // id y estado no cambian
  res.status(200).json(reserva);
}

function cancelar(req, res) {
  const reserva = reservas.find((r) => r.id === Number(req.params.id));
  if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
  if (reserva.estado === 'cancelada') {
    return res.status(409).json({ error: 'La reserva ya estaba cancelada' });
  }

  reserva.estado = 'cancelada';
  res.status(200).json(reserva);
}

module.exports = { listar, obtener, crear, editar, cancelar };
