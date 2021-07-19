"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Humans {
        constructor(_cor, _vtu) {
            this.cor = [];
            this.vel = [];
            this.cor = _cor;
            this.color = "red";
            this.size = 20;
            this.vtuber = _vtu;
            this.vel = [0, 0];
            this.hasBall = false;
        }
        spawn() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.arc(this.cor[0], this.cor[1], this.size, 0, 2 * Math.PI);
            Endabgabe.crc2.fillStyle = this.color;
            Endabgabe.crc2.fill();
            Endabgabe.crc2.strokeStyle = this.color;
            Endabgabe.crc2.lineWidth = 5;
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.drawImage(this.vtuber.img, this.cor[0] - this.size, this.cor[1] - this.size);
        }
        move(_ball) { }
        touchBall(_ball) {
            this.hasBall = _ball.size + this.size >= Endabgabe.getDist(this.cor, _ball.cor);
        }
    }
    Endabgabe.Humans = Humans;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=humans.js.map