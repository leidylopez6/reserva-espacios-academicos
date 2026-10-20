const express = require('express');
const c = require('../controllers/espacios.controller');

const router = express.Router();

router.get('/', c.listar);
router.post('/', c.crear);
// La ruta de disponibilidad va antes de /:id por claridad
router.get('/:id/disponibilidad', c.disponibilidad);
router.get('/:id', c.obtener);
router.put('/:id', c.editar);
router.delete('/:id', c.eliminar);

module.exports = router;
