namespace Endabgabe {
    export class Referees extends Humans {
        constructor(_cor: number[], _vtu: Vtuber) {
            super(_cor, _vtu);
            this.vel = [0, 0];
            this.size = 20;
            this.color = "white";
            this.speed = 5;
            this.isReferee = true;
        }

        touchBall(_ball: Ball): void {
            this.hasBall = false;
        }

        move(_ball: Ball): void {
            if (!timeFreeze) {
                let d: number = getDist([this.cor[0], 0], [_ball.cor[0], 0]);
                if (d == 0) {
                    d = 1;
                }

                this.vel[0] = (_ball.cor[0] - this.cor[0]) / d * this.speed;

                this.cor[0] += this.vel[0];
            }

            this.spawn();
        }
    }
}