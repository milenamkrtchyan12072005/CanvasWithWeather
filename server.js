weather = "winter"
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var Water = require("./modules/Water.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var DamnDog = require("./modules/DamnDog.js");
var Krakin = require("./modules/Krakin.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
damnArr = [];
krakinArr = [];
matrix = [];
waterArr = [];
grassHashiv = 0;

waterHashiv = 0;
grassEaterHashiv = 2;
predatorHashiv = 1;
damnHashiv = 1;
krakinHashiv = 5;
//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, damnDog, krakin, water) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < damnDog; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < krakin; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(40, 5, 5, 5, 5, 5, 5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                // grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                // grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predatorArr.push(pred);
                // predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var damn = new DamnDog(x, y);
                damnArr.push(damn);
                //damnHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var krakin = new Krakin(x, y);
                krakinArr.push(krakin);
                //damnHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var water = new Water(x, y);
                waterArr.push(water);
                //damnHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            if (weather != "winter") {
            grassArr[i].mul();
        } else if (weather == "summer"){
            grassArr[i].mul();
            grassArr[i].mul();

            }
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            if (weather != "summer" && weather != "winter") {
            waterArr[i].mul();
            }
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (damnArr[0] !== undefined) {
        for (var i in damnArr) {
            damnArr[i].eat();
        }
    }
    if (krakinArr[0] !== undefined) {
        for (var i in krakinArr) {
            krakinArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        waterCounter: waterHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        damnCounter: damnHashiv,
        krakinCounter: krakinHashiv,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}


function changeweather() {
    if (weather == "winter") {
        weather = "spring"
    }
    else if (weather == "spring") {
        weather = "summer"
    }
    else if (weather == "summer") {
        weather = "autumn"
    }
    else if (weather == "autumn") {
        weather = "winter"
    }
    io.sockets.emit("weather", weather)
}
setInterval(changeweather, 3000)
setInterval(game, 1000)