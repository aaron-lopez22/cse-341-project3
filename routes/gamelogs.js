const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const gamelogsController = require('../controllers/gamelogs');

const gamelogValidationRules = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('gameId').notEmpty().withMessage('Game ID is required'),
  body('status').notEmpty().withMessage('Status is required'),
  body('hoursPlayed').isInt({ min: 0 }).withMessage('Hours must be a number'),
  body('notes').isString().optional(),
  body('lastPlayed').isISO8601().withMessage('Must be a valid date')
];

router.get('/', gamelogsController.getAll);

router.get('/:id', gamelogsController.getSingle);

router.post('/', gamelogValidationRules, gamelogsController.createGameLog);

router.put('/:id', gamelogValidationRules, gamelogsController.updateGameLog);

router.delete('/:id', gamelogsController.deleteGameLog);    



module.exports = router;