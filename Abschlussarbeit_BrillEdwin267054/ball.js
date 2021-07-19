"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Ball {
        constructor() {
            this.cor = [];
            this.vel = [];
            this.cor = [Endabgabe.canvas.width / 2, Endabgabe.canvas.height / 2];
            this.size = 10;
            this.vel = [0, 0];
            this.friction = 0.04;
        }
        move() {
            if (!Endabgabe.timeFreeze) {
                this.cor[0] += this.vel[0];
                this.cor[1] += this.vel[1];
                this.vel[0] *= 1 - this.friction;
                this.vel[1] *= 1 - this.friction;
                let boundaries = [20, 10];
                if (this.cor[1] < boundaries[1] || this.cor[1] > Endabgabe.canvas.height - boundaries[1]) {
                    this.cor = [Endabgabe.canvas.width / 2, Endabgabe.canvas.height / 2];
                }
                let goals = [276, 402];
                if (this.cor[0] < boundaries[0]) {
                    if (this.cor[1] > goals[0] && this.cor[1] < goals[1]) {
                        Endabgabe.score[1]++;
                        Endabgabe.resetPlayer();
                    }
                    this.cor = [Endabgabe.canvas.width / 2, Endabgabe.canvas.height / 2];
                }
                if (this.cor[0] > Endabgabe.canvas.width - boundaries[0]) {
                    if (this.cor[1] > goals[0] && this.cor[1] < goals[1]) {
                        Endabgabe.score[0]++;
                        Endabgabe.resetPlayer();
                    }
                    this.cor = [Endabgabe.canvas.width / 2, Endabgabe.canvas.height / 2];
                }
            }
            this.spawn();
        }
        spawn() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.arc(this.cor[0], this.cor[1], this.size, 0, 2 * Math.PI);
            Endabgabe.crc2.fillStyle = "black";
            Endabgabe.crc2.fill();
        }
        getKicked(_targetCor, _deviation) {
            let d = Endabgabe.getDist(_targetCor, this.cor);
            let xWinkel = (_targetCor[0] - this.cor[0]) / d;
            let winkel = Math.acos(xWinkel);
            if (_targetCor[1] > this.cor[1]) {
                winkel = 2 * Math.PI - winkel;
            }
            let bogenDev = _deviation * Math.PI / 180;
            let newX = d * Math.cos(winkel + ((Math.random() - 0.5) * 2 * bogenDev));
            let newY = -d * Math.sin(winkel + ((Math.random() - 0.5) * 2 * bogenDev));
            let newTarget = [newX, newY];
            let tpd = Endabgabe.getDist(_targetCor, Endabgabe.ballTouch.cor);
            let tpWinkel = (_targetCor[0] - Endabgabe.ballTouch.cor[0]) / tpd;
            let tpAcos = Math.acos(tpWinkel);
            if (_targetCor[1] < Endabgabe.ballTouch.cor[1]) {
                tpAcos = 2 * Math.PI - tpAcos;
            }
            this.cor = [Endabgabe.ballTouch.cor[0] + ((Endabgabe.ballTouch.size + this.size) * Math.cos(tpAcos)), Endabgabe.ballTouch.cor[1] + ((Endabgabe.ballTouch.size + this.size) * Math.sin(tpAcos))];
            this.vel = [((newTarget[0])) * this.friction, ((newTarget[1])) * this.friction];
            this.cor[0] += this.vel[0];
            this.cor[1] += this.vel[1];
            this.vel[0] *= 1 - this.friction;
            this.vel[1] *= 1 - this.friction;
        }
    }
    Endabgabe.Ball = Ball;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=ball.js.map