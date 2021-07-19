"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Players extends Endabgabe.Humans {
        constructor(_cor, _whichTeam, _vtu, _i) {
            super(_cor, _vtu);
            this.per = 300;
            this.speed = Math.ceil(Math.random() * (Endabgabe.maxSpeed - Endabgabe.minSpeed) + Endabgabe.minSpeed);
            this.acc = Math.ceil(Math.random() * (Endabgabe.maxAcc - Endabgabe.minAcc) + Endabgabe.minAcc);
            this.whichTeam = _whichTeam;
            if (this.whichTeam) {
                this.color = Endabgabe.PlayerColor1;
                this.homePos = Endabgabe.team1pos[_i];
            }
            else {
                this.color = Endabgabe.PlayerColor2;
                this.homePos = Endabgabe.team2pos[_i];
            }
            this.nr = _i + 1;
            this.isReferee = false;
        }
        move(_ball) {
            if (!Endabgabe.timeFreeze) {
                let d = Endabgabe.getDist(this.cor, _ball.cor);
                if (d == 0) {
                    d = 1;
                }
                let homed = Endabgabe.getDist(this.cor, this.homePos);
                if (homed == 0) {
                    homed = 1;
                }
                if (d <= this.per) {
                    this.vel[0] = (_ball.cor[0] - this.cor[0]) / d * this.speed;
                    this.vel[1] = (_ball.cor[1] - this.cor[1]) / d * this.speed;
                }
                else {
                    this.vel[0] = (this.homePos[0] - this.cor[0]) / homed * this.speed;
                    this.vel[1] = (this.homePos[1] - this.cor[1]) / homed * this.speed;
                }
                this.cor[0] += this.vel[0];
                this.cor[1] += this.vel[1];
            }
            this.spawn();
        }
    }
    Endabgabe.Players = Players;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=player.js.map