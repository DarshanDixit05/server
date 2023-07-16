const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
let cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    // Handle signaling messages
    socket.on('mediaBlobUrl', (blobUrl) => {
        console.log('Received mediaBlobUrl:', blobUrl);
    });
    socket.on('offer', (data) => {
      socket.broadcast.emit('offer', data);
    });
  
    socket.on('answer', (data) => {
      socket.broadcast.emit('answer', data);
    });
  
    socket.on('iceCandidate', (data) => {
      socket.broadcast.emit('iceCandidate', data);
    });
  });


  
  const port = 3001;
  server.listen(port, () => {
    console.log(`Signaling server listening on port ${port}`);
  });