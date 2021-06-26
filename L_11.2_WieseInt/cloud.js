"use strict";
var FarmInt;
(function (FarmInt) {
    class cloud extends FarmInt.moving {
        constructor() {
            super("white");
            this.x = Math.random() * FarmInt.canvas.width;
            this.y = Math.random() * FarmInt.canvas.height / 4;
            this.vX = Math.random() * 10 - 5;
            this.size = [200, 42];
        }
    }
    FarmInt.cloud = cloud;
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=cloud.js.map