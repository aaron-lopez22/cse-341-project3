const express = require('express');
const router = express.Router();

const gamelogsController = require('../controllers/gamelogs');

router.get('/', gamelogsController.getAll);

router.get('/:id', gamelogsController.getSingle);

module.exports = router;