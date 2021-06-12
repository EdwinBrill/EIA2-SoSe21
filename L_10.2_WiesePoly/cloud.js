"use strict";
var PolyFarm;
(function (PolyFarm) {
    class cloud extends PolyFarm.moving {
        constructor() {
            super("white");
            this.y = Math.random() * PolyFarm.canvas.height / 4;
            this.vX = Math.random() * 10 - 5;
            this.size = [200, 42];
        }
    }
    PolyFarm.cloud = cloud;
})(PolyFarm || (PolyFarm = {}));
//# sourceMappingURL=cloud.js.map