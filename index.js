var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    // console.log(socket)
    socket.on('chat message', function (msg) {
        console.log('user msg: '+msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(port, function () {
    console.log(`listening on /:${port}`);
});