require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api', routes);

server.set('port', process.env.PORT);

server.listen(server.get('port'), () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}`);
});
