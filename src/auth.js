
const redis = require('redis');
const cors = require('cors');
// const jwt = require("jsonwebtoken");
const express = require('express');
const Router = require('./routes/authRouter');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const port = 5501;

// redis
const config = {
  socket: {
    host: 'redis',
    port: 6379,
  },
};
global.redisClient = redis.createClient(config);
// global.redisClient = redis.createClient();


global.redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

global.redisClient
  .connect()
  .then(() => {
    console.log('Redis connected');
  })
  .catch((err) => {
    console.log('Redis error: ', err);
  });


app.use('/', Router);
//app.get('/', (req, res) => res.send('This is the client!'));

app.listen(port, () => {
  console.log(`Auth listening at http://localhost:${port}`);
});