/* Modified from: Building an online multiplayer snowball throwing game (vanilla js, node, socket.io)
Developer: Web Dev Cody */
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connect', (socket) => {
  console.log('user connected', socket.id);
});




app.use(express.static('public'));

// app.listen(5000);
httpServer.listen(5000);
