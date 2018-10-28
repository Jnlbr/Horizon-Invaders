const server = require('../server');
const router = require('express').Router();
const socket = require('socket.io');
const io = socket(server);

router.get('/pad', require('./pad'));
// Socket definition
io.on('connection', function(socket){
  console.log('a user connected');
});

module.exports = router;