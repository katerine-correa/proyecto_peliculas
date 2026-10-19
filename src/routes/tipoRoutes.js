const { Router } = require('express');
const router = Router();
const { getTipos, createTipo, updateTipo } = require('../controllers/tipoController');

router.get('/tipos', getTipos);
router.post('/tipos', createTipo);
router.put('/tipos/:id', updateTipo);

module.exports = router;