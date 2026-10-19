const { Router } = require('express');
const router = Router();
const { getGeneros, createGenero, updateGenero } = require('../controllers/generoController');

router.get('/generos', getGeneros);
router.post('/generos', createGenero);
router.put('/generos/:id', updateGenero);

module.exports = router;