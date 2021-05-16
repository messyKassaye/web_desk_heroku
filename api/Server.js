const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
require('dotenv').config()
const routes = require('../api/routes');
const db = require('../api/db')
const { login, signup } = require('./auth/AuthController');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set app static file
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//mongoDB connection
const MONGODB_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGODB_PORT = process.env.MONGO_PORT
const MONGODB_DB = process.env.MONGO_DB
const DB_URL = `mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_DB}`
db.connect(DB_URL)

//application routes
app.use('/api',routes)
app.get('/login', login);
app.post('/signup',signup)

app.listen(port, () => console.log(`Listening on port ${port}`));