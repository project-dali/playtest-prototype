const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let prompts = ['Schneef', 'Grass', 'Pumpkins are classified as a fruit.', 'Tart', 'TFOML', 'If there\'s a fire, I...', 'Plant Mom', 'Scurvy Dog', 'Trash Panda', 'Bold Move', 'Cereal is soup.', 'How to really keep the doctor away', 'Bad Traffic Law', 'Tuesday Night', 'Purple Thumb', 'Google Driving', 'Super Secret Storage', 'Santa', 'USPS', 'Trash Day', 'Stop Signs', 'Church of ___', 'Drexel\'s School for the ___'];
let usedPrompts = [];
let round = 1;
let rndResponses = 0;
let jsonDataGlobal = '';
const jsonInit = {
    "rounds": []
}

const initializeJSON = (location, data) => {
    try {
        // write initial file structure
        fs.writeFileSync(location, JSON.stringify(data, null, 2));
    } catch (err) {
        throw err;
    }
}

initializeJSON('data.json', jsonInit);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/host', function (req, res) {
    res.sendFile(__dirname + '/host.html');
});

app.get('/data', function (req, res) {
    res.sendFile(__dirname + '/data.json');
});

app.use('/static', express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    // console.log('a user connected');
    socket.on('chat message', function (msg) {

        //increment index of total user responses in this round
        rndResponses++;

        let msgData = {
            response_num: rndResponses,
            message: msg
        };

        fs.readFile('data.json', 'utf8', function (err, currentData) {
            if (err) throw err;

            // read data.json as json object
            jsonDataGlobal = JSON.parse(currentData);

            // get most recent round obj and push to its responses arr
            let currentRoundParent = jsonDataGlobal.rounds[jsonDataGlobal.rounds.length - 1];
            currentRoundParent.responses.push(msgData);

            try {
                // rewrite data.json with the updated global json obj
                fs.writeFileSync('data.json', JSON.stringify(jsonDataGlobal, null, 2));

                // console.log('The User Response was appended to the file!');
            } catch (err) {
                throw err;
            }
        });

        // console.log('user msg: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('new game', function () {
        round = 1;
        usedPrompts = [];
        rndResponses = 0;
        // console.log('New game started!');
    })

    socket.on('new round', function () {

        rndResponses = 0;

        if (usedPrompts.length == 23) {
            round = 1;
            usedPrompts = [];
            // console.log('New round started!');
        }

        let i = Math.floor(Math.random() * prompts.length);

        while (usedPrompts.includes(i)) {
            i = Math.floor(Math.random() * prompts.length);
        }

        usedPrompts.push(i);

        let now = new Date();
        let responseMsg = 'Time ' + now.toLocaleString() + '; Round ' + round + '; prompt_id=' + i + '; prompt: ' + prompts[i];

        let roundData = {
            time: now.toISOString(),
            round: round,
            prompt_id: i,
            prompt: prompts[i],
            responses: []
        };

        fs.readFile('data.json', 'utf8', function (err, currentData) {
            if (err) throw err;

            // read data.json as json object
            jsonDataGlobal = JSON.parse(currentData);

            // push new round obj to rounds arr
            jsonDataGlobal.rounds.push(roundData);

            try {
                // rewrite data.json with the updated global json obj
                fs.writeFileSync('data.json', JSON.stringify(jsonDataGlobal, null, 2));

                // console.log('The User Response was appended to the file!');
            } catch (err) {
                throw err;
            }
        });

        // console.log(responseMsg)
        io.emit('chat message', responseMsg);

        round++;
    });

    socket.on('send survey', function () {
        let responseMsg = 'survey mode initiated';
        // console.log(responseMsg);

        io.emit('chat message', responseMsg)
        io.emit('take survey');
    });

    socket.on('disconnect', function () {
        // console.log('user disconnected');
    });

});

http.listen(port, function () {
    console.log(`listening on /:${port}`);
});
