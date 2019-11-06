var app = require('express')();
const fs = require('fs');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var prompts = ['Schneef', 'Grass', 'Pumpkins are classified as a fruit.', 'Tart', 'TFOML', 'If there\'s a fire, I...', 'Plant Mom', 'Scurvy Dog', 'Trash Panda', 'Bold Move', 'Cereal is soup.', 'How to really keep the doctor away', 'Bad Traffic Law', 'Tuesday Night', 'Purple Thumb', 'Google Driving', 'Super Secret Storage', 'Santa', 'USPS', 'Trash Day', 'Stop Signs', 'Church of ___', 'Drexel\'s School for the ___'];
var usedPrompts = [];
var round = 1;
var rndResponses = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/host', function (req, res) {
    res.sendFile(__dirname + '/host.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        rndResponses++;
        let msgData = { 
            response_num: rndResponses,
            message: msg
        };
        let data = JSON.stringify(msgData, null, 2);
         try {
            fs.appendFileSync('data.json', data);
            console.log('The User Response was appended to the file!');
          } catch (err) {
            throw err;
          }

        console.log('user msg: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('new game', function(){
        round = 1;
        usedPrompts = [];
        rndResponses = 0;
        console.log('New game started!');
    })

    socket.on('new round', function(){
        rndResponses = 0;
        if(usedPrompts.length == 23) {
            round = 1;
            usedPrompts = [];
            console.log('New game started!');
        }
        let i = Math.floor(Math.random() * prompts.length);
        while(usedPrompts.includes(i)) {
            i = Math.floor(Math.random() * prompts.length);
        }
        usedPrompts.push(i);
        let responseMsg = 'Round ' + round + '; prompt_id=' + i + '; prompt: ' + prompts[i];

        let roundData = { 
            round: round,
            prompt_id: i, 
            prompt: prompts[i], 
        };

        let data = JSON.stringify(roundData, null, 2);

        try {
            fs.appendFileSync('data.json', data);
            console.log('The User Response was appended to the file!');
          } catch (err) {
            throw err;
          }
        
        console.log(responseMsg)
        io.emit('chat message', responseMsg);

        round++;
    });

    socket.on('send survey', function(){
        let responseMsg = 'survey mode initiated';
        console.log(responseMsg);
        
        io.emit('chat message', responseMsg)
        io.emit('take survey');
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(port, function () {
    console.log(`listening on /:${port}`);
});