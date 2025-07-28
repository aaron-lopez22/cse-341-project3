const mongodb = require('../data/database');

const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('games').find();
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    })
};

const getSingle = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('games').find({_id: gameId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    })
};

module.exports = {
    getAll,
    getSingle
};