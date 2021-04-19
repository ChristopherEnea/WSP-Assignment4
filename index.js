const { json } = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.emit('welcome message', 'Welcome to my test site');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('status', (status) => {
        console.log(status);
        socket.emit('chat message', 'typing...' + status);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});