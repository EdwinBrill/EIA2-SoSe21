"use strict";
var Lektion8_1_Canvas;
(function (Lektion8_1_Canvas) {
    let canvas = document.querySelector("canvas");
    let crc2 = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 800;
    let colors = ["#e1f31b", "#f7094b", "#62e22e", "#010e55"];
    let zaehler = Math.floor(Math.random() * 420);
    for (let i = 0; i < zaehler; i++) {
        let x = Math.floor(Math.random() * 1280);
        let y = Math.floor(Math.random() * 800);
        let triColor = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[triColor];
        crc2.moveTo(x, y);
        crc2.lineTo(x * 4, y);
        crc2.lineTo(x * 2, y * 2);
        crc2.fill();
        let circColor = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[circColor];
        crc2.arc(x, y, 50, 0, 2 * Math.PI);
        crc2.fill();
        let lineColor = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[lineColor];
        crc2.moveTo(x, y);
        crc2.lineTo(x * 2, y * 2);
        crc2.closePath();
        crc2.stroke();
    }
})(Lektion8_1_Canvas || (Lektion8_1_Canvas = {}));
//# sourceMappingURL=script.js.map