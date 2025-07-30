const express = require('express');
const router = express.Router();

const usersController = require('../controllers/games');


router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createGame);

router.put('/:id', usersController.updateGame);

router.delete('/:id', usersController.deleteGame);


module.exports = router;