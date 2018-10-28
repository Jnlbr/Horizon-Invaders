const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const isEventValid = require('./util/isEventValid');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Scripts, images, and audio.
app.use("/public", express.static(__dirname + '/public'));
app.use(cors());
// Main game
app.get('/', function(req, res){
  res.sendFile(__dirname + '/pages/index.html');
});

const server = app.listen(3000, function(){
  console.log('listening on *:3000');
});
const io = socket(server);

// Socket definition
io.on('connection', function(socket) {
  console.log('A user connected');
});

// Controller
app.post('/pad', (req,res) => {
  let {event,body} = req.body;
  event = event.toLowerCase();
  if(isEventValid(event)) {
    io.emit(event, body);
    res.status(200).send({
      status: 200,
      body: {
        message: 'valid'
      }
    })
  } else {
    res.status(401).send({
      status: 401,
      error: 'Event not valid'
    });
  }
  
});

module.exports = server;