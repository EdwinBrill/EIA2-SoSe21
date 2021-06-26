"use strict";
var FarmInt;
(function (FarmInt) {
    class hive {
        constructor() {
            this.x = 130;
            this.y = FarmInt.canvas.height / 1.8;
        }
        spawn() {
            FarmInt.crc2.beginPath();
            FarmInt.crc2.ellipse(this.x, this.y, 45, 55, 0, 0, 2 * Math.PI);
            FarmInt.crc2.fillStyle = "orange";
            FarmInt.crc2.fill();
        }
    }
    FarmInt.hive = hive;
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=hive.js.map