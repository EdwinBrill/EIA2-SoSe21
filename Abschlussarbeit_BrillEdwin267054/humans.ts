namespace Endabgabe {
    export class Humans {
        cor: number[] = [];
        vel: number [] = [];
        size: number;
        color: string;
        speed: number;
        vtuber: Vtuber;
        hasBall: boolean;
        acc: number;
        nr: number;
        isReferee: boolean;
        homePos: number[];
        whichTeam: boolean;

        constructor(_cor: number[], _vtu: Vtuber) {
            this.cor = _cor;
            this.color = "red";
            this.size = 20;
            this.vtuber = _vtu;
            this.vel = [0, 0];
            this.hasBall = false;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.arc(this.cor[0], this.cor[1], this.size, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.strokeStyle = this.color;
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.drawImage(this.vtuber.img, this.cor[0] - this.size, this.cor[1] - this.size);
        }

        move(_ball: Ball): void {}

        touchBall(_ball: Ball): void {
            this.hasBall = _ball.size + this.size >= getDist(this.cor, _ball.cor);
        }
    }

    
}