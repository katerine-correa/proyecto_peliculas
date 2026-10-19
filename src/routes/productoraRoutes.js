const { Router } = require('express');
const router = Router();
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController');

router.get('/productoras', getProductoras);
router.post('/productoras', createProductora);
router.put('/productoras/:id', updateProductora);

module.exports = router;