"use strict";
var FarmInt;
(function (FarmInt) {
    class moving {
        constructor(_color = "#ffffff") {
            this.vX = 0;
            this.vY = 0;
            this.color = _color;
        }
        spawn() {
            FarmInt.crc2.beginPath();
            FarmInt.crc2.ellipse(this.x, this.y, this.size[0], this.size[1], 0, 0, 2 * Math.PI);
            FarmInt.crc2.fillStyle = this.color;
            FarmInt.crc2.fill();
        }
        move() {
            this.x += this.vX;
            this.y += this.vY;
            if (this.x > FarmInt.canvas.width + this.size[0]) {
                this.x = -this.size;
            }
            if (this.x < 0 - this.size[0]) {
                this.x = FarmInt.canvas.width + this.size[0];
            }
            if (this.y > FarmInt.canvas.height + this.size[1]) {
                this.y = -this.size;
            }
            if (this.y < 0 - this.size[1]) {
                this.y = FarmInt.canvas.height + this.size[1];
            }
            this.spawn();
        }
    }
    FarmInt.moving = moving;
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=moving.js.map