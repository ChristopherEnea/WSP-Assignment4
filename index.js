const { json } = require('express');
const express = require('express');
const dotenv = require('dotenv');
const Mongoose = require('mongoose');

const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);
const NameService = require('./services/user.services');

dotenv.config();

app.use(express.static('public'));

const items = [
  'Blue',
  'Red',
  'White',
  'Green',
  'Black',
  'Orange',
];
const recents = [];
let buffer = '';

io.on('connection', (socket) => {
  socket.emit('welcome message', 'Welcome to Assignment 4!');
  socket.on('submit', (msg) => {
    buffer = '';
    recents.push(msg);
    const temp = { name: msg };
    NameService.createName(temp);
    socket.emit('list', recents);
    console.log(`submit: ${msg}`);
  });
  socket.on('input', (input) => {
    buffer += input;
    console.log(input);
    NameService.getNames(buffer).then((data) => {
      const names = [];
      data.forEach((name) => {
        console.log(name);
        names.push(name.name);
      });
      socket.emit('list', names);
    });
  });
});

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  // console.log("listening on port: "  process.env.PORT)
  server.listen(process.env.PORT);
})();
