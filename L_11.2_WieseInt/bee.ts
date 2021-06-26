namespace FarmInt {
    export class bee extends moving {
        start: number[] = [];
        target: number[] = [];
        targetid: number;
        nektarAmnt: number;
        mag: number;

        constructor() {
            super("yellow");
            this.x = Beehive.x;
            this.y = Beehive.y;
            this.vX = Math.random() * 20 - 10;
            this.vY = Math.random() * 20 - 10;
            this.size = [10, 10];
            this.mag = 10 / 2;
            this.start[0] = this.x;
            this.start[1] = this.y;
            this.target = this.start;
            this.nektarAmnt = 0;
        }

        move(): void {
            let dist: number = this.distance(this.target[0], this.target[1], this.x, this.y);
            
            if (dist < 10) {
                if (this.target == this.start) {
                    this.targetid = Math.floor(Math.random() * flowerArray.length);
                    let targetflower: flower = flowerArray[this.targetid];
                    this.target = [targetflower.x, targetflower.y - 15];
                    Beehive.nektar += this.nektarAmnt;
                } else {
                    this.target = this.start;
                    this.nektarAmnt = flowerArray[this.targetid].NSFW;
                    flowerArray[this.targetid].NSFW = 0;
                }
            }

            dist = this.distance(this.target[0], this.target[1], this.x, this.y);

            this.vX = (this.mag / dist) * (this.target[0] - this.x);
            this.vY = (this.mag / dist) * (this.target[1] - this.y);

            this.x += this.vX;
            this.y += this.vY;

            if (this.x + this.size[0] / 2 > canvas.width || this.x - this.size[0] / 2 < 0) {
                this.vX *= -1;
            }
            if (this.y + this.size[1] / 2 > canvas.height || this.y - this.size[1] / 2 < 0) {
                this.vY *= -1;
            }

            this.spawn();
        }

        distance(x1: number, y1: number, x2: number, y2: number): number {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }
    }
}