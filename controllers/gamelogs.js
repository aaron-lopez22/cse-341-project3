const mongodb = require('../data/database');

const {ObjectId} = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['GameLogs']
    const result = await mongodb.getDatabase().collection('gamelogs').find();
    result.toArray().then((gamelogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(gamelogs);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['GameLogs']
    const gamelogsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('gamelogs').find({_id: gamelogsId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    })
};

const createGameLog = async (req, res) => {
    //#swagger.tags=['GameLogs']
    const gamelog = {  
        userId : req.body.userId,
        gameId : req.body.gameId,
        status : req.body.status,
        hoursPlayed : req.body.hoursPlayed,
        notes : req.body.notes,
        lastPlayed : req.body.lastPlayed
    };
    const result = await mongodb.getDatabase().collection('gamelogs').insertOne(gamelog);
    if (result.acknowledged) {
        res.status(201).json({ message: 'Game log created successfully', gamelogId: result.insertedId });  
    } else {
        res.status(500).json({ message: 'Failed to create game log' });
    }
};

const updateGameLog = async (req, res) => {
    //#swagger.tags=['GameLogs']
    const gamelogId = new ObjectId(req.params.id);
    const updatedGameLog = {
        userId : req.body.userId,
        gameId : req.body.gameId,
        status : req.body.status,
        hoursPlayed : req.body.hoursPlayed,
        notes : req.body.notes,
        lastPlayed : req.body.lastPlayed
    };
    const result = await mongodb.getDatabase().collection('gamelogs').updateOne({ _id: gamelogId }, { $set: updatedGameLog });
    if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Game log updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Game log not found or no changes made' });
    }
};

const deleteGameLog = async (req, res) => {
    //#swagger.tags=['GameLogs']
    const gamelogId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('gamelogs').deleteOne({ _id: gamelogId });
    if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Game log deleted successfully' });
    } else {
        res.status(404).json({ message: 'Game log not found' });
    }
};


module.exports = {
    getAll,
    getSingle,
    createGameLog,
    updateGameLog,
    deleteGameLog
};