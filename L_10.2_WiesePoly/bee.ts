namespace PolyFarm {
    export class bee extends moving {
        constructor() {
            super("yellow");
            this.y = Math.random() * (canvas.height +50) / 2;
            this.vX = Math.random() * 20 - 10;
            this.vY = Math.random() * 20 - 10;
            this.size = [10, 10];
        }
    }
}