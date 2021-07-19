"use strict";
var Endabgabe;
(function (Endabgabe) {
    Endabgabe.canvas = document.querySelector("#canvas");
    Endabgabe.crc2 = Endabgabe.canvas.getContext("2d");
    Endabgabe.score = [0, 0];
    let Anzeige = document.createElement("h2");
    Anzeige.innerText = "" + Endabgabe.score[0] + ":" + Endabgabe.score[1];
    let FieldDIV = document.getElementById("Field");
    FieldDIV.appendChild(Anzeige);
    let InputColor1;
    let InputColor2;
    let form = document.getElementById("preForm");
    let Substitutes = [];
    let idolString = ["botan", "calli", "fubuki", "gura", "ina", "noel", "ollie", "pikamee", "shuba", "yagoo", "achan"];
    Endabgabe.idolGroup = [];
    let sel1 = document.createElement("select");
    let sel2 = document.createElement("select");
    for (let idol of idolString) {
        let img = document.createElement("img");
        img.src = "assets/" + idol + ".png";
        let vtu = { name: idol, img: img };
        Endabgabe.idolGroup.push(vtu);
    }
    let testBall = new Endabgabe.Ball;
    let humans = [];
    Endabgabe.team1pos = [[135, 340], [240, 450], [240, 205], [310, 64], [310, 614], [440, 340], [560, 170], [560, 510], [680, 340], [750, 450], [750, 205]];
    Endabgabe.team2pos = [[915, 340], [800, 450], [800, 205], [740, 64], [740, 614], [625, 340], [490, 170], [490, 510], [390, 340], [300, 450], [300, 205]];
    Endabgabe.timeFreeze = false;
    let vtuber1;
    let vtuber2;
    let swapIndex;
    let swapSel = document.getElementById("swap");
    function buildField() {
        Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvas.width, Endabgabe.canvas.height);
        drawGoalLines();
        Endabgabe.timeFreeze = false;
        for (let hum of humans) {
            hum.touchBall(testBall);
            if (hum.hasBall) {
                Endabgabe.ballTouch = hum;
                Endabgabe.timeFreeze = true;
            }
        }
        for (let hum of humans) {
            hum.move(testBall);
        }
        testBall.move();
    }
    function handleLoad() {
        Endabgabe.canvas = document.getElementById("canvas");
        for (let i = 0; i < 11; i++) {
            let pos = [];
            pos.push(Endabgabe.team1pos[i][0]);
            pos.push(Endabgabe.team1pos[i][1]);
            //ich danke Typescript an dieser Stelle für 45 schlimme Minuten
            let p = new Endabgabe.Players(pos, true, vtuber1, i);
            humans.push(p);
        }
        for (let i = 0; i < 11; i++) {
            let pos = [];
            pos.push(Endabgabe.team2pos[i][0]);
            pos.push(Endabgabe.team2pos[i][1]);
            let p = new Endabgabe.Players(pos, false, vtuber2, i);
            humans.push(p);
        }
        for (let i = 0; i < 3; i++) {
            let p = new Endabgabe.Players([-40, 0], true, vtuber1, 11 + i);
            Substitutes.push(p);
        }
        for (let i = 0; i < 3; i++) {
            let p = new Endabgabe.Players([-40, 0], false, vtuber2, 11 + i);
            Substitutes.push(p);
        }
        let referee = new Endabgabe.Referees([Endabgabe.canvas.width / 2, Endabgabe.canvas.height / 2], Endabgabe.idolGroup[9]);
        humans.push(referee);
        referee = new Endabgabe.Referees([Endabgabe.canvas.width / 2, 25], Endabgabe.idolGroup[10]);
        humans.push(referee);
        referee = new Endabgabe.Referees([Endabgabe.canvas.width / 2, Endabgabe.canvas.height - 25], Endabgabe.idolGroup[10]);
        humans.push(referee);
        setInterval(buildField, 16.6);
    }
    function kickBall(_event) {
        let target = [_event.pageX, _event.pageY];
        if (target[0] < Endabgabe.canvas.width + 8 && target[1] < Endabgabe.canvas.height + 8 && target[0] > 8 && target[1] > 8) {
            if (Endabgabe.timeFreeze) {
                testBall.getKicked(target, Endabgabe.ballTouch.acc);
            }
            let notClicked = true;
            let playerDiv = document.querySelector(".Player");
            for (let i = 0; i < humans.length; i++) {
                let clickd = getDist(humans[i].cor, target);
                if (clickd < humans[i].size && !humans[i].isReferee) {
                    swapIndex = i;
                    notClicked = false;
                    playerDiv.style.display = "grid";
                    let cool = document.querySelector("#nrInput");
                    cool.innerText = "" + humans[i].nr;
                    let cool2 = document.querySelector("#accInput");
                    cool2.innerText = "" + humans[i].acc;
                    let cool3 = document.querySelector("#speedInput");
                    cool3.innerText = "" + humans[i].speed;
                }
            }
            if (notClicked) {
                playerDiv.style.display = "none";
            }
        }
    }
    function getDist(_cor1, _cor2) {
        let d = Math.sqrt(Math.pow(_cor1[0] - _cor2[0], 2) + Math.pow(_cor1[1] - _cor2[1], 2));
        return d;
    }
    Endabgabe.getDist = getDist;
    function resetPlayer() {
        for (let i = 0; i < 11; i++) {
            let pos = [];
            pos.push(Endabgabe.team1pos[i][0]);
            pos.push(Endabgabe.team1pos[i][1]);
            humans[i].cor = pos;
        }
        for (let i = 11; i < 22; i++) {
            let pos = [];
            pos.push(Endabgabe.team2pos[i - 11][0]);
            pos.push(Endabgabe.team2pos[i - 11][1]);
            humans[i].cor = pos;
        }
        Anzeige.innerText = "" + Endabgabe.score[0] + ":" + Endabgabe.score[1];
    }
    Endabgabe.resetPlayer = resetPlayer;
    function drawGoalLines() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(1025, 276);
        Endabgabe.crc2.lineTo(1025, 402);
        Endabgabe.crc2.strokeStyle = Endabgabe.PlayerColor2;
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.stroke();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(25, 276);
        Endabgabe.crc2.lineTo(25, 402);
        Endabgabe.crc2.strokeStyle = Endabgabe.PlayerColor1;
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.stroke();
    }
    function startGame() {
        let menu = document.getElementById("preGame");
        let spiel = document.querySelector(".container");
        InputColor1 = document.getElementById("jerseyColor1");
        InputColor2 = document.getElementById("jerseyColor2");
        Endabgabe.PlayerColor1 = InputColor1.value;
        Endabgabe.PlayerColor2 = InputColor2.value;
        let vsel1 = document.getElementById("vtuber1");
        let vsel2 = document.getElementById("vtuber2");
        for (let idol of Endabgabe.idolGroup) {
            if (idol.name == vsel1.value) {
                vtuber1 = idol;
                break;
            }
        }
        for (let idol of Endabgabe.idolGroup) {
            if (idol.name == vsel2.value) {
                vtuber2 = idol;
                break;
            }
        }
        let minAccSel = document.getElementById("minAcc");
        Endabgabe.minAcc = +minAccSel.value;
        let maxAccSel = document.getElementById("maxAcc");
        Endabgabe.maxAcc = +maxAccSel.value;
        let minSpeedSel = document.getElementById("minSpeed");
        Endabgabe.minSpeed = +minSpeedSel.value;
        let maxSpeeSel = document.getElementById("maxSpeed");
        Endabgabe.maxSpeed = +maxSpeeSel.value;
        menu.style.display = "none";
        spiel.style.display = "grid";
        handleLoad();
    }
    function vtuberSelection() {
        let label1 = document.createElement("label");
        label1.htmlFor = "vtuber1";
        label1.innerText = "Team1 Vtuber";
        form.appendChild(label1);
        sel1.id = "vtuber1";
        for (let i = 0; i < 9; i++) {
            let idol = Endabgabe.idolGroup[i];
            let opt = document.createElement("option");
            if (idol.name == "gura") {
                opt.selected = true;
            }
            opt.value = idol.name;
            opt.innerText = idol.name[0].toUpperCase() + idol.name.substring(1);
            sel1.appendChild(opt);
        }
        form.appendChild(sel1);
        let label2 = document.createElement("label");
        label2.htmlFor = "vtuber2";
        label2.innerText = "Team2 Vtuber";
        form.appendChild(label2);
        sel2.id = "vtuber2";
        for (let i = 0; i < 9; i++) {
            let idol = Endabgabe.idolGroup[i];
            let opt = document.createElement("option");
            opt.value = idol.name;
            opt.innerText = idol.name[0].toUpperCase() + idol.name.substring(1);
            sel2.appendChild(opt);
        }
        form.appendChild(sel2);
    }
    function swapPlayer() {
        let sub;
        let v = +swapSel.value;
        if (v >= 0) {
            if (humans[swapIndex].whichTeam) {
                sub = Substitutes[v];
            }
            else {
                sub = Substitutes[v + 3];
            }
            let subPos = [];
            let subHome = [];
            subPos.push(humans[swapIndex].cor[0]);
            subPos.push(humans[swapIndex].cor[1]);
            subHome.push(humans[swapIndex].homePos[0]);
            subHome.push(humans[swapIndex].homePos[1]);
            humans[swapIndex] = sub;
            sub.cor = subPos;
            sub.homePos = subHome;
            let cool = document.querySelector("#nrInput");
            cool.innerText = "" + humans[swapIndex].nr;
            let cool2 = document.querySelector("#accInput");
            cool2.innerText = "" + humans[swapIndex].acc;
            let cool3 = document.querySelector("#speedInput");
            cool3.innerText = "" + humans[swapIndex].speed;
        }
    }
    window.addEventListener("click", kickBall);
    window.addEventListener("load", vtuberSelection);
    swapSel.addEventListener("change", swapPlayer);
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startGame);
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=main.js.map