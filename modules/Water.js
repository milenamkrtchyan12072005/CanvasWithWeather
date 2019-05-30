var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Water extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        this.life++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.life >= 2) {
            waterHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let water = new Water(x, y);
            waterArr.push(water);
            this.life = 0;
        }
    }
}