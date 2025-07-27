const express = require('express');

const mongodb = require('./data/database');
const e = require('express');



const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDB((err) => {
  if (err) {
    console.log('Failed to connect to the database');
    console.error(err);
  } else {
    console.log('Connected to the database and listening on port', port);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




