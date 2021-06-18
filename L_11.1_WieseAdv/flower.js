"use strict";
var PolyFarm;
(function (PolyFarm) {
    class flower extends PolyFarm.moving {
        constructor() {
            let petalColor = ["#f7437b", "#af8ad3", "#f1ef17", "#327aee"];
            super(petalColor[Math.floor(Math.random() * 4)]);
            this.y = Math.random() * PolyFarm.canvas.height / 2 + PolyFarm.canvas.height / 2;
            this.angle = 0;
            this.petalOrigin = this.x + 5;
            this.NSFW = Math.random() * 5;
        }
        spawn() {
            PolyFarm.crc2.beginPath();
            PolyFarm.crc2.rect(this.x, this.y, 10, 50);
            PolyFarm.crc2.fillStyle = "green";
            PolyFarm.crc2.fill();
            PolyFarm.crc2.beginPath();
            PolyFarm.crc2.arc(this.petalOrigin + this.petalX, this.y, 15, 0, 2 * Math.PI);
            PolyFarm.crc2.fillStyle = this.color;
            PolyFarm.crc2.fill();
            this.fillNectar();
        }
        fillNectar() {
            this.NSFW = this.NSFW + 1;
            if (this.NSFW > 5) {
                this.NSFW = 5;
            }
            for (let i = 1; i <= this.NSFW; i++) {
                PolyFarm.crc2.beginPath();
                PolyFarm.crc2.arc(this.petalOrigin + this.petalX + 20, this.y + i * 10, 5, 0, 2 * Math.PI);
                PolyFarm.crc2.fillStyle = "orange";
                PolyFarm.crc2.fill();
            }
        }
        move() {
            this.angle += 0.1;
            this.petalX = Math.sin(this.angle);
            this.spawn();
        }
    }
    PolyFarm.flower = flower;
})(PolyFarm || (PolyFarm = {}));
//# sourceMappingURL=flower.js.map