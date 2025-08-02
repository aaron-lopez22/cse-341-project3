const mongodb = require('../data/database');

const {ObjectId} = require('mongodb');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
  //#swagger.tags=['Gamelogs']
  try {
    const result = await mongodb.getDatabase().collection('gamelogs').find();
    const gamelogs = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(gamelogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve gamelogs', error: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Gamelogs']
  try {
    const gamelogsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('gamelogs').find({ _id: gamelogsId });
    const games = await result.toArray();
    if (!games.length) {
      return res.status(404).json({ message: 'Game log not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve game log', error: err.message });
  }
};

const createGameLog = async (req, res) => {
  //#swagger.tags=['Gamelogs']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gamelog = {
      userId: req.body.userId,
      gameId: req.body.gameId,
      status: req.body.status,
      hoursPlayed: req.body.hoursPlayed,
      notes: req.body.notes,
      lastPlayed: req.body.lastPlayed
    };

    const result = await mongodb.getDatabase().collection('gamelogs').insertOne(gamelog);
    if (result.acknowledged) {
      res.status(201).json({ message: 'Game log created successfully', gamelogId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create game log' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating game log', error: err.message });
  }
};


const updateGameLog = async (req, res) => {
  //#swagger.tags=['Gamelogs']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gamelogId = new ObjectId(req.params.id);
    const updatedGameLog = {
      userId: req.body.userId,
      gameId: req.body.gameId,
      status: req.body.status,
      hoursPlayed: req.body.hoursPlayed,
      notes: req.body.notes,
      lastPlayed: req.body.lastPlayed
    };

    const result = await mongodb.getDatabase().collection('gamelogs').updateOne(
      { _id: gamelogId },
      { $set: updatedGameLog }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Game log updated successfully' });
    } else {
      res.status(404).json({ message: 'Game log not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating game log', error: err.message });
  }
};

const deleteGameLog = async (req, res) => {
  //#swagger.tags=['Gamelogs']
  try {
    const gamelogId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('gamelogs').deleteOne({ _id: gamelogId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Game log deleted successfully' });
    } else {
      res.status(404).json({ message: 'Game log not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting game log', error: err.message });
  }
};


module.exports = {
    getAll,
    getSingle,
    createGameLog,
    updateGameLog,
    deleteGameLog
};