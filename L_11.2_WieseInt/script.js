"use strict";
var FarmInt;
(function (FarmInt) {
    FarmInt.canvas = document.querySelector("canvas");
    FarmInt.crc2 = FarmInt.canvas.getContext("2d");
    let mntPoints = [];
    let thicc = FarmInt.canvas.width / 20;
    let treeThiccness = Math.floor(Math.random() * thicc + 150);
    let movingArr = [];
    FarmInt.flowerArray = [];
    FarmInt.Beehive = new FarmInt.hive();
    function fillSky(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            movingArr.push(new FarmInt.cloud());
        }
    }
    function fillField(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            let Bluemchen = new FarmInt.flower();
            movingArr.push(Bluemchen);
            FarmInt.flowerArray.push(Bluemchen);
        }
        console.log(movingArr);
    }
    function fillHive(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            movingArr.push(new FarmInt.bee());
        }
    }
    window.addEventListener("click", spawnBee);
    function spawnBee(_event) {
        let spawnX = _event.pageX;
        let spawnY = _event.pageY;
        let Piene = new FarmInt.bee();
        Piene.x = spawnX;
        Piene.y = spawnY;
        movingArr.push(Piene);
    }
    function updateIMG() {
        FarmInt.canvas.innerHTML = "";
        drawSky();
        drawGrass();
        drawMountains();
        for (let i = 0; i < movingArr.length; i++) {
            movingArr[i].move();
        }
        drawTree();
        FarmInt.Beehive.spawn();
    }
    function drawSky() {
        FarmInt.crc2.fillStyle = "#dba100";
        FarmInt.crc2.fillRect(0, 0, FarmInt.canvas.width, FarmInt.canvas.height);
    }
    function drawGrass() {
        FarmInt.crc2.fillStyle = "#8207a8";
        FarmInt.crc2.fillRect(0, FarmInt.canvas.height, FarmInt.canvas.width, -FarmInt.canvas.height / 2);
        FarmInt.crc2.strokeRect(0, FarmInt.canvas.height, FarmInt.canvas.width, -FarmInt.canvas.height / 2);
    }
    function drawMountains() {
        FarmInt.crc2.beginPath();
        FarmInt.crc2.moveTo(mntPoints[0][0], mntPoints[0][1]);
        for (let i = 1; i < mntPoints.length; i++) {
            FarmInt.crc2.lineTo(mntPoints[i][0], mntPoints[i][1]);
        }
        FarmInt.crc2.fillStyle = "#e0e0e0";
        FarmInt.crc2.fill();
        FarmInt.crc2.stroke();
    }
    function generateMountains(_mntCnt) {
        mntPoints.push([0, FarmInt.canvas.height / 2]);
        for (let i = 1; i < _mntCnt * 2 - 1; i++) {
            let trash = [];
            trash.push(i * FarmInt.canvas.width / (_mntCnt * 2));
            trash.push(Math.random() * FarmInt.canvas.height / 2);
            mntPoints.push(trash);
        }
        mntPoints.push([FarmInt.canvas.width, FarmInt.canvas.height / 2]);
    }
    function drawTree() {
        let h = 3 * FarmInt.canvas.height / 4;
        let pos = [100, FarmInt.canvas.height];
        FarmInt.crc2.beginPath();
        FarmInt.crc2.fillStyle = "#462917";
        FarmInt.crc2.fillRect(pos[0], pos[1], thicc, -h);
        FarmInt.crc2.closePath();
        FarmInt.crc2.beginPath();
        FarmInt.crc2.arc(pos[0] + thicc / 2, pos[1] - h, treeThiccness, 0, 2 * Math.PI);
        FarmInt.crc2.fillStyle = "#b237d8";
        FarmInt.crc2.fill();
    }
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        FarmInt.canvas = document.getElementById("canvas");
        fillSky(Math.random() * 10 + 1);
        fillField(Math.random() * 50 + 1);
        fillHive(5);
        generateMountains(Math.random() * 2 + 3);
        setInterval(updateIMG, 16.666);
    }
})(FarmInt || (FarmInt = {}));
//# sourceMappingURL=script.js.map