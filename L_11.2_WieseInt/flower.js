"use strict";
var FarmInt;
(function (FarmInt) {
    class flower extends FarmInt.moving {
        constructor() {
            let petalColor = ["#f7437b", "#af8ad3", "#f1ef17", "#327aee"];
            super(petalColor[Math.floor(Math.random() * 4)]);
            this.x = Math.random() * FarmInt.canvas.width;
            this.y = Math.random() * FarmInt.canvas.height / 2 + FarmInt.canvas.height / 2;
            this.angle = 0;
            this.petalOrigin = this.x + 5;
            this.NSFW = Math.random() * 5;
        }
        spawn() {
            FarmInt.crc2.beginPath();
            FarmInt.crc2.rect(this.x, this.y, 10, 50);
            FarmInt.crc2.fillStyle = "green";
            FarmInt.crc2.fill();
            FarmInt.crc2.beginPath();
            FarmInt.crc2.arc(this.petalOrigin + this.petalX, this.y, 15, 0, 2 * Math.PI);
            FarmInt.crc2.fillStyle = this.color;
            FarmInt.crc2.fill();
            this.fillNectar();
        }
        fillNectar() {
            this.NSFW = this.NSFW + 0.05;
            if (this.NSFW > 5) {
                this.NSFW = 5;
            }
            for (let i = 1; i <= this.NSFW; i++) {
                FarmInt.crc2.beginPath();
                FarmInt.crc2.arc(this.petalOrigin + this.petalX + 20, this.y + i * 10, 5, 0, 2 * Math.PI);
                FarmInt.crc2.fillStyle = "orange";
                FarmInt.crc2.fill();
            }
        }
        move() {
            this.angle += 0.1;
            this.petalX = Math.sin(this.angle);
            this.spawn();
        }
    }
    FarmInt.flower = flower;
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=flower.js.map