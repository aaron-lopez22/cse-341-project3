const mongodb = require('../data/database');

const {ObjectId} = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('gamelogs').find();
    result.toArray().then((gamelogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(gamelogs);
    })
};

const getSingle = async (req, res) => {
    const gamelogsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('gamelogs').find({_id: gamelogsId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    })
};

module.exports = {
    getAll,
    getSingle
};