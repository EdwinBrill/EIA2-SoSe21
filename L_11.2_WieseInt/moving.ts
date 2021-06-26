namespace FarmInt {
    export abstract class moving {
        x: number;
        y: number;
        vX: number = 0;
        vY: number = 0;
        size: number[];
        color: string;

        constructor(_color = "#ffffff") {
            this.color = _color;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.ellipse(this.x, this.y, this.size[0], this.size[1], 0, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
        }

        move() {
            this.x += this.vX;
            this.y += this.vY;
            if (this.x > canvas.width + this.size[0]) {
                this.x = -this.size;
            }
            if (this.x < 0 - this.size[0]) {
                this.x = canvas.width + this.size[0];
            }
            if (this.y > canvas.height + this.size[1]) {
                this.y = -this.size;
            }
            if (this.y < 0 - this.size[1]) {
                this.y = canvas.height + this.size[1];
            }

            this.spawn();
        }

    }
}