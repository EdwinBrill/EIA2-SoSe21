namespace FarmInt {
    export class hive {
        x: number;
        y: number;
        nektar: number;

        constructor() {
            this.x = 130;
            this.y = canvas.height / 1.8;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.ellipse(this.x, this.y, 45, 55, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "orange";
            crc2.fill();
        }
    }
}