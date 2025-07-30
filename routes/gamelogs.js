const express = require('express');
const router = express.Router();

const gamelogsController = require('../controllers/gamelogs');

router.get('/', gamelogsController.getAll);

router.get('/:id', gamelogsController.getSingle);

router.post('/', gamelogsController.createGameLog);

router.put('/:id', gamelogsController.updateGameLog);

router.delete('/:id', gamelogsController.deleteGameLog);    



module.exports = router;