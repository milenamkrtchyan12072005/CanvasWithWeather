var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class DamnDog extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
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
    chooseCell(character1, character2, character3) {
        this.getNewCoordinates();
        return super.chooseCell(character1, character2, character3) ;
    }
    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        //եթե կա բազմանում է
        if (newCell) {
            damnHashiv++
            var x = newCell[0];
            var y = newCell[1];
            //ստեղծում է նոր օբյեկտ (այստեղ գիշատիչ)
            //և տեղադրում է այն գիշատիչների զանգվածի մեջ
           
            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
           matrix[y][x] = 4; 
           var newDamnDog = new DamnDog(x, y);
           damnArr.push(newDamnDog); 
           this.life = 5
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let emptyCells = this.chooseCell(2,3,6);
        let newCell = random(emptyCells);

        //եթե կա հարմար սնունդ
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //գիշատիչների համար դա խոտակերն է, խոտակերների զանգվածի մեջ eatArr
                for (var i in waterArr) {
                    if (waterArr[i].x == x && waterArr[i].y == y) {
                        waterArr.splice(i, 1);
                        this.life++;
                        // this.life++;
                        // break;
                    }
                }
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    this.life++;
                    // break;
                }
            }

            for (var i in grassEaterArr) {
                if ( x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    this.life++;
                    // break;
                }
            }

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;
            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.life > 15) {
                this.mul();
            }
        } else {
            //եթե չկա հարմար սնունդ 
            this.move();

        }
    }


    //move() շարժվել
    move() {

        this.life--;
        //որոնում է դատարկ տարածքներ
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
        if (this.life < 5) { //մահանում է, եթե էներգիան 0֊ից ցածր է
            this.die();
        }
    }


    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն գիշատիչների զանգվածից
        for (var i in damnArr) {
            if (this.x == damnArr[i].x && this.y == damnArr[i].y) {
                damnArr.splice(i, 1); // գիշատիչների զանգվածից հանում է i երրորդ տարրը , այսինքն 1 հատ գիշատիչ է հանում
                break; // ցիկլը կանգնում է
            }
        }
    }

}