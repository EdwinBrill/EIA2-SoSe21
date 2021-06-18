namespace PolyFarm {
    export class flower extends moving {
        angle: number;
        petalX: number;
        petalOrigin: number;
        //NectarStandFloWer
        NSFW: number;
        

        constructor() {
            let petalColor: string [] = ["#f7437b", "#af8ad3", "#f1ef17", "#327aee"];
            super(petalColor[Math.floor(Math.random() * 4)]);
            this.y = Math.random() * canvas.height / 2 + canvas.height / 2;
            this.angle = 0;
            this.petalOrigin = this.x + 5;
            this.NSFW = Math.random() * 5;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.rect(this.x, this.y, 10, 50);
            crc2.fillStyle = "green";
            crc2.fill();
            crc2.beginPath();
            crc2.arc(this.petalOrigin + this.petalX, this.y, 15, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();

            this.fillNectar();

        }

        fillNectar(): void {
            this.NSFW = this.NSFW + 1;
            if(this.NSFW > 5) {
                this.NSFW = 5;
            }

            for (let i:number = 1; i <= this.NSFW; i++) {
                crc2.beginPath();
                crc2.arc(this.petalOrigin + this.petalX + 20, this.y + i * 10, 5, 0, 2 * Math.PI);
                crc2.fillStyle = "orange";
                crc2.fill();
            }
        }

        move(): void {
            this.angle += 0.1;
            this.petalX = Math.sin(this.angle);
            this.spawn();
        }
    }
}