const { Router } = require('express');
const router = Router();
const { getMedia, createMedia, updateMedia } = require('../controllers/mediaController');

router.get('/media', getMedia);
router.post('/media', createMedia);
router.put('/media/:id', updateMedia);

module.exports = router;