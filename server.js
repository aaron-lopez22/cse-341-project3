const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const mongodb = require('./data/database');
const passport = require('passport');
const cors = require('cors');

const GitHubStrategy = require('passport-github2').Strategy;





const app = express();

const port = process.env.PORT || 3000;
app.use(bodyparser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );next();
})
.use(cors({methods: 'GET, POST, PUT, DELETE, PUT, PATCH, OPTIONS'}))
.use(cors({origin: '*'}))
.use('/', require('./routes'));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile)
}));


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'); });

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: true
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

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




