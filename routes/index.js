const router = require('express').Router(); 

router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});


router.use('/games', require('./games'));

router.use('/gameLogs', require('./gamelogs'));



module.exports = router;

