"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Referees extends Endabgabe.Humans {
        constructor(_cor, _vtu) {
            super(_cor, _vtu);
            this.vel = [0, 0];
            this.size = 20;
            this.color = "white";
            this.speed = 5;
            this.isReferee = true;
        }
        touchBall(_ball) {
            this.hasBall = false;
        }
        move(_ball) {
            if (!Endabgabe.timeFreeze) {
                let d = Endabgabe.getDist([this.cor[0], 0], [_ball.cor[0], 0]);
                if (d == 0) {
                    d = 1;
                }
                this.vel[0] = (_ball.cor[0] - this.cor[0]) / d * this.speed;
                this.cor[0] += this.vel[0];
            }
            this.spawn();
        }
    }
    Endabgabe.Referees = Referees;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=referees.js.map