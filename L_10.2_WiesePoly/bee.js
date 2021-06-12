"use strict";
var PolyFarm;
(function (PolyFarm) {
    class bee extends PolyFarm.moving {
        constructor() {
            super("yellow");
            this.y = Math.random() * (PolyFarm.canvas.height + 50) / 2;
            this.vX = Math.random() * 20 - 10;
            this.vY = Math.random() * 20 - 10;
            this.size = [10, 10];
        }
    }
    PolyFarm.bee = bee;
})(PolyFarm || (PolyFarm = {}));
//# sourceMappingURL=bee.js.map