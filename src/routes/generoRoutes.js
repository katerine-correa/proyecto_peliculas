const { Router } = require('express');
const router = Router();
const { getGeneros, createGenero, updateGenero, deleteGenero } = require('../controllers/generoController');

router.get('/generos', getGeneros);
router.post('/generos', createGenero);
router.put('/generos/:id', updateGenero);
router.delete('/generos/:id', deleteGenero);

module.exports = router;