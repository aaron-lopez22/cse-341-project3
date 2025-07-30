const express = require('express');
const bodyparser = require('body-parser');

const mongodb = require('./data/database');




const app = express();

const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );next();
});

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




