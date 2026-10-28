const { Router } = require('express');
const router = Router();
const { getProductoras, createProductora, updateProductora, deleteProductora } = require('../controllers/productoraController');

router.get('/productoras', getProductoras);
router.post('/productoras', createProductora);
router.put('/productoras/:id', updateProductora);
router.delete('/productoras/:id', deleteProductora);

module.exports = router;