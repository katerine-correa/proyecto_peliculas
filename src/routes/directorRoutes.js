const { Router } = require('express');
const router = Router();
const { getDirectores, createDirector, updateDirector, deleteDirector } = require('../controllers/directorController');

router.get('/directores', getDirectores);
router.post('/directores', createDirector);
router.put('/directores/:id', updateDirector);
router.delete('/directores/:id', deleteDirector);

module.exports = router;