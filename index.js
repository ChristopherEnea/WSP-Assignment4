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

io.on('connection', (socket) => {
  socket.emit('welcome message', 'Welcome to Assignment 4! Type a name to search and press enter to insert into database');

  socket.on('submit', (msg) => {
    const temp = { name: msg };
    NameService.createName(temp);
    socket.emit('list', null);
  });

  socket.on('delete', () => NameService.deleteNames());

  socket.on('input', (input) => {
    console.log(input);
    NameService.getNames(input).then((data) => {
      const names = [];
      data.forEach((name) => {
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
  server.listen(process.env.PORT);
})();
