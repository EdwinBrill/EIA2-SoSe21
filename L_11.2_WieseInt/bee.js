"use strict";
var FarmInt;
(function (FarmInt) {
    class bee extends FarmInt.moving {
        constructor() {
            super("yellow");
            this.start = [];
            this.target = [];
            this.x = FarmInt.Beehive.x;
            this.y = FarmInt.Beehive.y;
            this.vX = Math.random() * 20 - 10;
            this.vY = Math.random() * 20 - 10;
            this.size = [10, 10];
            this.mag = 10 / 2;
            this.start[0] = this.x;
            this.start[1] = this.y;
            this.target = this.start;
            this.nektarAmnt = 0;
        }
        move() {
            let dist = this.distance(this.target[0], this.target[1], this.x, this.y);
            if (dist < 10) {
                if (this.target == this.start) {
                    this.targetid = Math.floor(Math.random() * FarmInt.flowerArray.length);
                    let targetflower = FarmInt.flowerArray[this.targetid];
                    this.target = [targetflower.x, targetflower.y - 15];
                    FarmInt.Beehive.nektar += this.nektarAmnt;
                }
                else {
                    this.target = this.start;
                    this.nektarAmnt = FarmInt.flowerArray[this.targetid].NSFW;
                    FarmInt.flowerArray[this.targetid].NSFW = 0;
                }
            }
            dist = this.distance(this.target[0], this.target[1], this.x, this.y);
            this.vX = (this.mag / dist) * (this.target[0] - this.x);
            this.vY = (this.mag / dist) * (this.target[1] - this.y);
            this.x += this.vX;
            this.y += this.vY;
            if (this.x + this.size[0] / 2 > FarmInt.canvas.width || this.x - this.size[0] / 2 < 0) {
                this.vX *= -1;
            }
            if (this.y + this.size[1] / 2 > FarmInt.canvas.height || this.y - this.size[1] / 2 < 0) {
                this.vY *= -1;
            }
            this.spawn();
        }
        distance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }
    }
    FarmInt.bee = bee;
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=bee.js.map