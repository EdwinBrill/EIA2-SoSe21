namespace Endabgabe {
    export class Ball {
        cor: number[] = [];
        size: number;
        vel: number[] = [];
        friction: number;

        constructor() {
            this.cor = [canvas.width / 2, canvas.height / 2];
            this.size = 10;
            this.vel = [0, 0];
            this.friction = 0.04;
        }

        move() {
            if (!timeFreeze) {
                this.cor[0] += this.vel[0];
                this.cor[1] += this.vel[1];
                this.vel[0] *= 1 - this.friction; 
                this.vel[1] *= 1 - this.friction;

                let boundaries: number[] = [20,10];
                if (this.cor[1] < boundaries[1] || this.cor[1] > canvas.height - boundaries[1]) {
                    this.cor = [canvas.width / 2, canvas.height / 2];
                }

                let goals: number[] = [276, 402];
                if (this.cor[0] < boundaries[0]) {
                    if (this.cor[1] > goals[0] && this.cor[1] < goals[1]) {
                        score[1]++;
                        resetPlayer();
                    }
                    this.cor = [canvas.width / 2, canvas.height / 2];
                    
                }

                if (this.cor[0] > canvas.width - boundaries[0]) {
                    if (this.cor[1] > goals[0] && this.cor[1] < goals[1]) {
                        score[0]++;
                        resetPlayer();
                    } 
                    this.cor = [canvas.width / 2, canvas.height / 2];
                    
                }
            }

            this.spawn();
        }

        spawn(): void {
            crc2.beginPath();
                crc2.arc(this.cor[0], this.cor[1], this.size, 0, 2 * Math.PI);
                crc2.fillStyle = "black";
                crc2.fill();
        }

        getKicked(_targetCor: number[], _deviation: number) {
            let d: number = getDist(_targetCor, this.cor);
            let xWinkel: number = (_targetCor[0] - this.cor[0]) / d;
            let winkel: number = Math.acos(xWinkel);
            if (_targetCor[1] > this.cor[1]) {
                winkel = 2 * Math.PI - winkel;
                }

            let bogenDev: number = _deviation * Math.PI / 180;

            let newX: number = d * Math.cos(winkel + ((Math.random() - 0.5) * 2 * bogenDev));
            let newY: number = -d * Math.sin(winkel + ((Math.random() - 0.5) * 2 * bogenDev));
            let newTarget: number[] = [newX, newY];
            
            let tpd: number = getDist(_targetCor, ballTouch.cor);
            let tpWinkel: number = (_targetCor[0] - ballTouch.cor[0]) / tpd;
            let tpAcos: number = Math.acos(tpWinkel);
            if (_targetCor[1] < ballTouch.cor[1]) {
                tpAcos = 2 * Math.PI - tpAcos;
                }
            this.cor = [ballTouch.cor[0] + ((ballTouch.size + this.size) * Math.cos(tpAcos)), ballTouch.cor[1] + ((ballTouch.size + this.size) * Math.sin(tpAcos))];

            this.vel = [((newTarget[0])) * this.friction, ((newTarget[1])) * this.friction];

            this.cor[0] += this.vel[0];
            this.cor[1] += this.vel[1];
            this.vel[0] *= 1 - this.friction; 
            this.vel[1] *= 1 - this.friction;
        }
    }  
}
