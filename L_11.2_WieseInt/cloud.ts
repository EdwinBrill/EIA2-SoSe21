namespace FarmInt {
    export class cloud extends moving {
        constructor() {
            super("white");
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height / 4;
            this.vX = Math.random() * 10 - 5;
            this.size = [200, 42];
        }
    }
}