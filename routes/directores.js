const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

router.get('/', directorController.getAllDirectores);
router.post('/', directorController.createDirector);

module.exports = router;