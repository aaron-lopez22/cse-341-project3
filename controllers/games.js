const mongodb = require('../data/database');

const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');


const getAll = async (req, res) => {
    //#swagger.tags=['Games']
    const result = await mongodb.getDatabase().collection('games').find();
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    })
};

const getSingle = async (req, res) => {
      //#swagger.tags=['Games']
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('games').find({_id: gameId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    })
};


const createGame = async (req, res) => {
      //#swagger.tags=['Games']
        const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   const game = {
   title: req.body.title,
   platform: req.body.platform,
    genre: req.body.genre,
    developer: req.body.developer,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating,
    description: req.body.description
    };
    const result = await mongodb.getDatabase().collection('games').insertOne(game);
    if (result.acknowledged) {
        res.status(201).json({ message: 'Game created successfully', gameId: result.insertedId });
    } else {
        res.status(500).json({ message: 'Failed to create game' });
    }
};

const updateGame = async (req, res) => {
      //#swagger.tags=['Games']
        const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const gameId = new ObjectId(req.params.id);
    const updatedGame = {
        title: req.body.title,
        platform: req.body.platform,
        genre: req.body.genre,
        developer: req.body.developer,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        description: req.body.description
    };
    const result = await mongodb.getDatabase().collection('games').updateOne({ _id: gameId }, { $set: updatedGame });
    if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Game updated successfully' });
    } else {
        res.status(404).json({ message: 'Game not found or no changes made' });
    }
};

const deleteGame = async (req, res) => {
      //#swagger.tags=['Games']
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('games').deleteOne({ _id: gameId });
    if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Game deleted successfully' });
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
};



module.exports = {
    getAll,
    getSingle,
    createGame,
    updateGame,
    deleteGame
};