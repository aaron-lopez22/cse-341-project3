const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const usersController = require('../controllers/games');

const gameValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('platform').notEmpty().withMessage('Platform is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('developer').notEmpty().withMessage('Developer is required'),
  body('releaseDate').isISO8601().withMessage('Valid releaseDate required'),
  body('rating').isFloat({ min: 0, max: 10 }).withMessage('Rating must be 0–10'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters')
];

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', gameValidationRules, usersController.createGame);

router.put('/:id', gameValidationRules, usersController.updateGame);


router.delete('/:id', usersController.deleteGame);


module.exports = router;