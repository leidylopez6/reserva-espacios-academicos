const express = require('express');
const c = require('../controllers/reservas.controller');

const router = express.Router();

router.get('/', c.listar);
router.post('/', c.crear);
router.get('/:id', c.obtener);
router.put('/:id', c.editar);
router.delete('/:id', c.cancelar);

module.exports = router;
