"use strict";
var PolyFarm;
(function (PolyFarm) {
    PolyFarm.canvas = document.querySelector("canvas");
    PolyFarm.crc2 = PolyFarm.canvas.getContext("2d");
    let mntPoints = [];
    let thicc = PolyFarm.canvas.width / 20;
    let treeThiccness = Math.floor(Math.random() * thicc + 150);
    let movingArr = [];
    function fillSky(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            movingArr.push(new PolyFarm.cloud());
        }
    }
    function fillField(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            movingArr.push(new PolyFarm.flower());
        }
    }
    function fillHive(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            movingArr.push(new PolyFarm.bee());
        }
    }
    function updateIMG() {
        PolyFarm.canvas.innerHTML = "";
        drawSky();
        drawGrass();
        drawMountains();
        for (let i = 0; i < movingArr.length; i++) {
            movingArr[i].move();
        }
        drawTree();
    }
    function drawSky() {
        PolyFarm.crc2.fillStyle = "#dba100";
        PolyFarm.crc2.fillRect(0, 0, PolyFarm.canvas.width, PolyFarm.canvas.height);
    }
    function drawGrass() {
        PolyFarm.crc2.fillStyle = "#8207a8";
        PolyFarm.crc2.fillRect(0, PolyFarm.canvas.height, PolyFarm.canvas.width, -PolyFarm.canvas.height / 2);
        PolyFarm.crc2.strokeRect(0, PolyFarm.canvas.height, PolyFarm.canvas.width, -PolyFarm.canvas.height / 2);
    }
    function drawMountains() {
        PolyFarm.crc2.beginPath();
        PolyFarm.crc2.moveTo(mntPoints[0][0], mntPoints[0][1]);
        for (let i = 1; i < mntPoints.length; i++) {
            PolyFarm.crc2.lineTo(mntPoints[i][0], mntPoints[i][1]);
        }
        PolyFarm.crc2.fillStyle = "#e0e0e0";
        PolyFarm.crc2.fill();
        PolyFarm.crc2.stroke();
    }
    function generateMountains(_mntCnt) {
        mntPoints.push([0, PolyFarm.canvas.height / 2]);
        for (let i = 1; i < _mntCnt * 2 - 1; i++) {
            let trash = [];
            trash.push(i * PolyFarm.canvas.width / (_mntCnt * 2));
            trash.push(Math.random() * PolyFarm.canvas.height / 2);
            mntPoints.push(trash);
        }
        mntPoints.push([PolyFarm.canvas.width, PolyFarm.canvas.height / 2]);
    }
    function drawTree() {
        let h = 3 * PolyFarm.canvas.height / 4;
        let pos = [0, PolyFarm.canvas.height];
        PolyFarm.crc2.beginPath();
        PolyFarm.crc2.fillStyle = "#462917";
        PolyFarm.crc2.fillRect(pos[0], pos[1], thicc, -h);
        PolyFarm.crc2.closePath();
        PolyFarm.crc2.beginPath();
        PolyFarm.crc2.arc(pos[0] + thicc / 2, pos[1] - h, treeThiccness, 0, 2 * Math.PI);
        PolyFarm.crc2.fillStyle = "#b237d8";
        PolyFarm.crc2.fill();
    }
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        PolyFarm.canvas = document.getElementById("canvas");
        fillSky(Math.random() * 10 + 1);
        fillField(Math.random() * 50 + 1);
        fillHive(5);
        generateMountains(Math.random() * 2 + 3);
        setInterval(updateIMG, 16.666);
    }
})(PolyFarm || (PolyFarm = {}));
//# sourceMappingURL=script.js.map