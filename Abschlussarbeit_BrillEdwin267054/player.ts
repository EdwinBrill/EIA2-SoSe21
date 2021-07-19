namespace Endabgabe {
    export class Players extends Humans {
        per: number;

        constructor(_cor: number[], _whichTeam: boolean, _vtu: Vtuber, _i: number) {
            super(_cor, _vtu);
            this.per = 300;
            this.speed = Math.ceil(Math.random() * (maxSpeed - minSpeed) + minSpeed);
            this.acc = Math.ceil(Math.random() * (maxAcc - minAcc) + minAcc);
            this.whichTeam = _whichTeam;
            if (this.whichTeam) {
                this.color = PlayerColor1; 
                this.homePos = team1pos[_i]; 
            } else {
                this.color = PlayerColor2;
                this.homePos = team2pos[_i]; 
            }
            this.nr = _i + 1;
            this.isReferee = false;
        }

        move(_ball: Ball) {
            if (!timeFreeze) {
                let d: number = getDist(this.cor, _ball.cor);
                if (d == 0) {
                    d = 1;
                }

                let homed: number = getDist(this.cor, this.homePos);
                if (homed == 0) {
                    homed = 1;
                }

                if (d <= this.per) { 
                    this.vel[0] = (_ball.cor[0] - this.cor[0]) / d * this.speed;
                    this.vel[1] = (_ball.cor[1] - this.cor[1]) / d * this.speed;
                } else {
                    this.vel[0] = (this.homePos[0] - this.cor[0]) / homed * this.speed;
                    this.vel[1] = (this.homePos[1] - this.cor[1]) / homed * this.speed;
                }

                this.cor[0] += this.vel[0];
                this.cor[1] += this.vel[1];
            }

            this.spawn();
        }

    }
}