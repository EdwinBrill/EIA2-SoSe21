namespace Endabgabe {
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    export let score: number[] = [0, 0];
    let Anzeige: HTMLHeadingElement = document.createElement("h2");
    Anzeige.innerText = "" + score[0] + ":" + score[1];
    let FieldDIV: HTMLDivElement = <HTMLDivElement>document.getElementById("Field");
    FieldDIV.appendChild(Anzeige);

    let InputColor1: HTMLInputElement;
    let InputColor2: HTMLInputElement;

    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("preForm");

    export let PlayerColor1: string;
   
    export let PlayerColor2: string;

    let Substitutes: Players [] = [];

    let idolString: string[] = ["botan", "calli", "fubuki", "gura", "ina", "noel", "ollie", "pikamee", "shuba", "yagoo", "achan"];
    export let idolGroup: Vtuber[] = [];
    let sel1: HTMLSelectElement = document.createElement("select");
    let sel2: HTMLSelectElement = document.createElement("select");

    export let minAcc: number;
    export let maxAcc: number;

    export let minSpeed: number;
    export let maxSpeed: number;

    export interface Vtuber {
        name: string;
        img: HTMLImageElement;
    }

    for (let idol of idolString) {
        let img: HTMLImageElement = document.createElement("img");
        img.src = "assets/" + idol + ".png";
        let vtu: Vtuber = {name: idol, img: img};
        idolGroup.push(vtu);
    }

    let testBall = new Ball;

    let humans: Humans[] = [];

    export const team1pos: number[][] = [[135, 340], [240, 450], [240, 205], [310, 64], [310, 614], [440, 340], [560, 170], [560, 510], [680, 340], [750, 450], [750, 205]];
    export const team2pos: number[][] = [[915, 340], [800, 450], [800, 205], [740, 64], [740, 614], [625, 340], [490, 170], [490, 510], [390, 340], [300, 450], [300, 205]];

    export let timeFreeze: boolean = false;

    export let ballTouch: Humans;

    let vtuber1: Vtuber;
    let vtuber2: Vtuber;

    let swapIndex: number;
    let swapSel: HTMLSelectElement = <HTMLSelectElement>document.getElementById("swap");



    function buildField(): void {
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        drawGoalLines();
        timeFreeze = false;
        for (let hum of humans) {
            hum.touchBall(testBall);
            if (hum.hasBall) {
                ballTouch = hum;
                timeFreeze = true;
            }
        }
        for (let hum of humans) {
            hum.move(testBall);
        }
        testBall.move();
    }

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        for (let i:number = 0; i < 11; i++) {
            let pos: number[] = [];
            pos.push(team1pos[i][0]);
            pos.push(team1pos[i][1]);
            //ich danke Typescript an dieser Stelle für 45 schlimme Minuten
            let p: Players = new Players(pos, true, vtuber1, i);
            humans.push(p);
        }
        for (let i:number = 0; i < 11; i++) {
            let pos: number[] = [];
            pos.push(team2pos[i][0]);
            pos.push(team2pos[i][1]);
            let p: Players = new Players(pos, false, vtuber2, i);
            humans.push(p);
        }

        for (let i:number = 0; i < 3; i++) {
            let p: Players = new Players([-40, 0], true, vtuber1, 11 + i);
            Substitutes.push(p);
        }

        for (let i:number = 0; i < 3; i++) {
            let p: Players = new Players([-40, 0], false, vtuber2, 11 + i);
            Substitutes.push(p);
        }

        let referee = new Referees([canvas.width / 2, canvas.height / 2], idolGroup[9]);
        humans.push(referee);

        referee = new Referees([canvas.width / 2, 25], idolGroup[10]);
        humans.push(referee);

        referee = new Referees([canvas.width / 2, canvas.height - 25], idolGroup[10]);
        humans.push(referee);

        setInterval(buildField, 16.6);
    }

    function kickBall(_event: MouseEvent): void {
        let target: number[] = [_event.pageX, _event.pageY];
        if (target[0] < canvas.width + 8 && target[1] < canvas.height + 8 && target[0] > 8 && target[1] > 8) {
            if (timeFreeze) {
    
                    testBall.getKicked(target, ballTouch.acc);
                
            }

            let notClicked: boolean = true;
            let playerDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".Player");
            for (let i: number = 0; i < humans.length; i++) {
                let clickd: number = getDist(humans[i].cor, target);
                if (clickd < humans[i].size && !humans[i].isReferee) {
                    swapIndex = i;
                    notClicked = false;
                    playerDiv.style.display = "grid";
                    let cool: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#nrInput");
                    cool.innerText = "" + humans[i].nr;

                    let cool2: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#accInput");
                    cool2.innerText = "" + humans[i].acc;

                    let cool3: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#speedInput");
                    cool3.innerText = "" + humans[i].speed;
                }
            }

            if (notClicked) {
                playerDiv.style.display = "none";
            }
        }
    }

    export function getDist(_cor1: number[], _cor2: number[]): number {
        let d: number = Math.sqrt(Math.pow(_cor1[0] - _cor2[0], 2) + Math.pow(_cor1[1] - _cor2[1], 2));
        return d;
    }



    export function resetPlayer(): void {
        for (let i:number = 0; i < 11; i++) {
            let pos: number[] = [];
            pos.push(team1pos[i][0]);
            pos.push(team1pos[i][1]);
            humans[i].cor = pos;
        }

        for (let i:number = 11; i < 22; i++) {
            let pos: number[] = [];
            pos.push(team2pos[i - 11][0]);
            pos.push(team2pos[i - 11][1]);
            humans[i].cor = pos;
        }
        Anzeige.innerText = "" + score[0] + ":" + score[1];
    }

    function drawGoalLines(): void {
        crc2.beginPath();
        crc2.moveTo(1025, 276);
        crc2.lineTo(1025, 402);
        crc2.strokeStyle = PlayerColor2;
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(25, 276);
        crc2.lineTo(25, 402);
        crc2.strokeStyle = PlayerColor1;
        crc2.closePath();
        crc2.stroke();
    }

    function startGame(): void {
        let menu: HTMLDivElement = <HTMLDivElement>document.getElementById("preGame");
        let spiel: HTMLDivElement = <HTMLDivElement>document.querySelector(".container");

        
        InputColor1 = <HTMLInputElement>document.getElementById("jerseyColor1");
        InputColor2 = <HTMLInputElement>document.getElementById("jerseyColor2");
        PlayerColor1 = InputColor1.value;
        PlayerColor2 = InputColor2.value;

        let vsel1 = <HTMLInputElement>document.getElementById("vtuber1");
        let vsel2 = <HTMLInputElement>document.getElementById("vtuber2");
        for (let idol of idolGroup) {
            if (idol.name == vsel1.value) {
                vtuber1 = idol;
                break;
            }
        }

        for (let idol of idolGroup) {
            if (idol.name == vsel2.value) {
                vtuber2 = idol;
                break;
            }
        }

        let minAccSel: HTMLInputElement = <HTMLInputElement>document.getElementById("minAcc");
        minAcc = +minAccSel.value;

        let maxAccSel: HTMLInputElement = <HTMLInputElement>document.getElementById("maxAcc");
        maxAcc = +maxAccSel.value;

        let minSpeedSel: HTMLInputElement = <HTMLInputElement>document.getElementById("minSpeed");
        minSpeed = +minSpeedSel.value;

        let maxSpeeSel: HTMLInputElement = <HTMLInputElement>document.getElementById("maxSpeed");
        maxSpeed = +maxSpeeSel.value;

        menu.style.display = "none";
        spiel.style.display = "grid";
        handleLoad();
    }

    function vtuberSelection(): void {
        let label1: HTMLLabelElement = document.createElement("label");
        label1.htmlFor = "vtuber1";
        label1.innerText = "Team1 Vtuber";
        form.appendChild(label1);
        sel1.id = "vtuber1";
        for (let i:number = 0; i < 9; i++) {
            let idol: Vtuber = idolGroup[i];
            let opt: HTMLOptionElement = document.createElement("option");
            if (idol.name == "gura") {
                opt.selected = true;
            }
            opt.value = idol.name;
            opt.innerText = idol.name[0].toUpperCase() + idol.name.substring(1);
            sel1.appendChild(opt);
        }

        form.appendChild(sel1);

        let label2: HTMLLabelElement = document.createElement("label");
        label2.htmlFor = "vtuber2";
        label2.innerText = "Team2 Vtuber";
        form.appendChild(label2);
        sel2.id = "vtuber2";
        for (let i:number = 0; i < 9; i++) {
            let idol: Vtuber = idolGroup[i];
            let opt: HTMLOptionElement = document.createElement("option");
            opt.value = idol.name;
            opt.innerText = idol.name[0].toUpperCase() + idol.name.substring(1);
            sel2.appendChild(opt);
        }

        form.appendChild(sel2);
    }

    function swapPlayer(): void {
        let sub: Players;
        let v: number = +swapSel.value;
        
        if (v >= 0) {
            if (humans[swapIndex].whichTeam) {
                sub = Substitutes[v];
            } else {
                sub = Substitutes[v + 3];
            }
            
            let subPos: number[] = [];
            let subHome: number[] = [];

            subPos.push(humans[swapIndex].cor[0]);
            subPos.push(humans[swapIndex].cor[1]);

            subHome.push(humans[swapIndex].homePos[0]);
            subHome.push(humans[swapIndex].homePos[1]);
        
            humans[swapIndex] = sub;
            sub.cor = subPos;
            sub.homePos = subHome;

            let cool: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#nrInput");
            cool.innerText = "" + humans[swapIndex].nr;

            let cool2: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#accInput");
            cool2.innerText = "" + humans[swapIndex].acc;

            let cool3: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#speedInput");
            cool3.innerText = "" + humans[swapIndex].speed;
        }    
    }


    window.addEventListener("click", kickBall);

    window.addEventListener("load", vtuberSelection);

    swapSel.addEventListener("change", swapPlayer);

    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startButton");
    startButton.addEventListener("click", startGame);

}


/* Image Resources:
 https://virtualyoutuber.fandom.com/wiki/A-chan
 https://virtualyoutuber.fandom.com/wiki/Mori_Calliope
 https://virtualyoutuber.fandom.com/wiki/Hololive?file=YAGOO_headshot.jpg
 https://virtualyoutuber.fandom.com/wiki/Oozora_Subaru
 https://virtualyoutuber.fandom.com/wiki/Shishiro_Botan
 https://virtualyoutuber.fandom.com/wiki/Shirakami_Fubuki
 https://virtualyoutuber.fandom.com/wiki/Kureiji_Ollie
 https://virtualyoutuber.fandom.com/wiki/Shirogane_Noel
 https://virtualyoutuber.fandom.com/wiki/Amano_Pikamee
 https://virtualyoutuber.fandom.com/wiki/Ninomae_Ina%27nis
 https://virtualyoutuber.fandom.com/wiki/Gawr_Gura */