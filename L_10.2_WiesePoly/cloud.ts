namespace PolyFarm {
    export class cloud extends moving {
        constructor() {
            super("white");
            this.y = Math.random() * canvas.height / 4;
            this.vX = Math.random() * 10 - 5;
            this.size = [200, 42];
        }
    }
}