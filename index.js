var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/host', function (req, res) {
    res.sendFile(__dirname + '/host.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    // console.log(socket)
    socket.on('chat message', function (msg) {
        console.log('user msg: '+msg);
        io.emit('chat message', msg);
    });

    socket.on('new round', function(){
        let prompt = 'Boiiiii';
        let responseMsg = 'timestamp; prompt_id=00; prompt: ' + prompt;
        
        console.log(responseMsg)
        io.emit('chat message', responseMsg);
    })

    socket.on('send survey', function(){
        let responseMsg = 'survey mode initiated';
        console.log(responseMsg);
        
        io.emit('chat message', responseMsg)
        io.emit('take survey');
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(port, function () {
    console.log(`listening on /:${port}`);
});