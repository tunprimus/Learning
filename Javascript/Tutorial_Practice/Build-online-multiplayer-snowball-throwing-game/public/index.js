/* Modified from: Building an online multiplayer snowball throwing game (vanilla js, node, socket.io)
Developer: Web Dev Cody */

const socket = io(`ws://localhost:5000`);



socket.on('connect', () => {
  console.log('Connected');
});
