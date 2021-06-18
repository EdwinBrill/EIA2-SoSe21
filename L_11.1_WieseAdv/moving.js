"use strict";
var PolyFarm;
(function (PolyFarm) {
    class moving {
        constructor(_color = "#ffffff") {
            this.vX = 0;
            this.vY = 0;
            this.color = _color;
            this.x = Math.random() * PolyFarm.canvas.width;
        }
        spawn() {
            PolyFarm.crc2.beginPath();
            PolyFarm.crc2.ellipse(this.x, this.y, this.size[0], this.size[1], 0, 0, 2 * Math.PI);
            PolyFarm.crc2.fillStyle = this.color;
            PolyFarm.crc2.fill();
        }
        move() {
            this.x += this.vX;
            this.y += this.vY;
            if (this.x > PolyFarm.canvas.width + this.size[0]) {
                this.x = -this.size;
            }
            if (this.x < 0 - this.size[0]) {
                this.x = PolyFarm.canvas.width + this.size[0];
            }
            if (this.y > PolyFarm.canvas.height + this.size[1]) {
                this.y = -this.size;
            }
            if (this.y < 0 - this.size[1]) {
                this.y = PolyFarm.canvas.height + this.size[1];
            }
            this.spawn();
        }
    }
    PolyFarm.moving = moving;
})(PolyFarm || (PolyFarm = {}));
//# sourceMappingURL=moving.js.map