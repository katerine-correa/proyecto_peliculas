const { Router } = require('express');
const router = Router();
const { getDirectores, createDirector, updateDirector } = require('../controllers/directorController');

router.get('/directores', getDirectores);
router.post('/directores', createDirector);
router.put('/directores/:id', updateDirector);

module.exports = router;