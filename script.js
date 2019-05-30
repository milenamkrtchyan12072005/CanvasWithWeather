
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let waterCountElement = document.getElementById('waterCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let damnCountElement = document.getElementById('damnCount');
    let krakinCountElement = document.getElementById('krakinCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 


    socket.on("weather", function (w) {
        weather = w;
        console.log(weather);
        weather.innerHTML = weather
    });

    function drawCreatures(data) {
        // console.log('matrix[0].length', matrix[0].length);
        
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        waterCountElement.innerText = data.waterCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        damnCountElement.innerText = data.damnCounter;
        krakinCountElement.innerText = data.krakinCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (weather == "winter") {
                        fill("white");
                        rect(j * side, i * side, side, side);
                    }
                    if (weather == "spring") {
                    fill("green");
                    rect(j * side, i * side, side, side);
                    }
                    if (weather == "summer") {
                        fill("yellow");
                        rect(j * side, i * side, side, side);
                    }
                    if (weather == "autumn") {
                        fill("orange");
                        rect(j * side, i * side, side, side);
                    }
                } else if (matrix[i][j] == 2) {
                    fill("#302b2b");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('rgb(119, 0, 255)');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('#00d9ff');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }

    socket.on("data", drawCreatures);
}