namespace MemoryFormElements{

    let StartButton: HTMLButtonElement;
    let PairSelect: HTMLInputElement;
    let SizeSlider: HTMLInputElement;
    let CardColorPicker: HTMLInputElement;
    let FontColorPicker: HTMLInputElement;
    let BackGColorPicker: HTMLInputElement;
    let FontPicker: HTMLSelectElement;
    let Settings: HTMLDivElement;
    let Spielfeld: HTMLDivElement;
    let Gewonnen: HTMLDivElement;
    var timerSpan: HTMLSpanElement;

    let PaarAnzahl: number;
    let score: number = 0;
    let KartenStapel: HTMLDivElement [] = [];
    let clickedArray: HTMLDivElement [] = [];
    var SpielZeit: number;
    var Form: FormData;



    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        StartButton = <HTMLButtonElement>document.getElementById("StartButton");

        PairSelect = <HTMLInputElement>document.getElementById("pairInput");

        SizeSlider = <HTMLInputElement>document.getElementById("cardSize");

        CardColorPicker = <HTMLInputElement>document.getElementById("cardColor");
        FontColorPicker = <HTMLInputElement>document.getElementById("fontColor");
        BackGColorPicker = <HTMLInputElement>document.getElementById("backgColor");

        FontPicker = <HTMLSelectElement>document.getElementById("KartenFont");

        Settings = <HTMLDivElement>document.getElementById("Einstellungen");               
        Spielfeld = <HTMLDivElement>document.getElementById("container");
        Gewonnen = <HTMLDivElement>document.getElementById("gewonnen");
        timerSpan = <HTMLSpanElement>document.getElementById("timerSpan");

        SpielZeit = Date.now();

        StartButton.addEventListener("click", createFormData);


        //document.getElementById(StartButton).addEventListener("click");
        //let scoreN: number = 0;
        //clickedArray: HTMLDivElement[] = []; 
    }

    function createFormData(): void {
        Form = new FormData(document.forms[0]);
        Form.append("pairs", PairSelect.value);
        Form.append("size", SizeSlider.value);
        Form.append("backCol", BackGColorPicker.value);
        Form.append("kartCol", CardColorPicker.value);
        Form.append("textCol", FontColorPicker.value);
        Form.append("font", FontPicker.value);
        startGame();
    }

    function startGame(): void {
        PaarAnzahl = +Form.get("pairs");
        let Abstand: number = 4;
        let indizes: string[] = [];
        
        if(PaarAnzahl >= 5 && PaarAnzahl <= 25){
            Settings.style.display = "none";
            Spielfeld.style.display = "block";
            Spielfeld.style.backgroundColor = Form.get("backCol") + "";
            for(let i = 0; i < PaarAnzahl * 2; i++){
                indizes.push(i+"");
            }
    
            indizes = fisherYates(indizes);
    

            for (let i: number = 0; i < PaarAnzahl * 2; i++) {
                let Karte: HTMLDivElement = document.createElement("div");
                let KartenSize: number = +Form.get("size")*10 + 40;
                Karte.style.width = KartenSize + "px";
                Karte.style.height = KartenSize + "px";

                Karte.style.position = "absolute";
                let maxwidth: number = Math.floor(1280/(KartenSize+Abstand));
                Karte.style.backgroundColor = CardColorPicker.value;
                Karte.style.left = (i % maxwidth)*KartenSize + (i%maxwidth)*Abstand + "px";
                Karte.style.top = Math.floor(i / maxwidth)*KartenSize + Math.floor(i / maxwidth)*Abstand + "px";
                Karte.classList.add("karte");
                Karte.id = indizes[i];

                let front: HTMLDivElement = document.createElement("div");
                let frontText: HTMLParagraphElement = document.createElement("p");
                frontText.innerHTML = Math.floor(+Karte.id/2)+"";
                frontText.style.color = Form.get("textCol")+"";
                frontText.style.fontFamily = Form.get("font")+"";
                frontText.style.fontSize = Math.floor(KartenSize/2)+"px";
                frontText.style.position = "relative";
                frontText.style.top = -KartenSize/2+"px";
                front.style.position = "absolute";
                front.style.width = "100%";
                front.style.height = "100%";
                front.style.textAlign = "center";
                front.appendChild(frontText);
                Karte.appendChild(front);
    
                let ruecken: HTMLDivElement = document.createElement("div");
                ruecken.style.position = "absolute";
                ruecken.style.width = "100%";
                ruecken.style.height = "100%";
                ruecken.style.backgroundColor = Form.get("kartCol")+"";
                Karte.appendChild(ruecken);

                Karte.addEventListener("click", function(): void {
                    turnCard(this);
                });

                KartenStapel.push(Karte);
                Spielfeld.appendChild(Karte);
            }

        } else {
            alert("Bitte eine Zahl zwsichen 5 und 25 angeben!");
        }

    }

    function turnCard(_Karte: HTMLDivElement): void {
        if (clickedArray.length < 2) {
            clickedArray.push(_Karte);

            let ruecken = _Karte.getElementsByTagName("div")[1];
            ruecken.style.display = "none";

            if (clickedArray.length == 2) {
                setTimeout(function(): void {
                    let charArray: string[] = [];
                    for (let Karte of clickedArray) {
                        charArray.push(Karte.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML);
                    }
                    if (charArray[0] == charArray[1]) {
                        for (let Karte of clickedArray) {
                            Karte.style.display = "none";
                        }
                        score++;
                        console.log(score);
                        if (score >= PaarAnzahl) {
                            endGame();
                        }
                        clickedArray = [];
                    } else {
                        for (let Karte of clickedArray) {
                            let ruecken = Karte.getElementsByTagName("div")[1];
                            ruecken.style.display = "block";
                        }
                        clickedArray = [];
                    }
                }, 2000);
            }

        }
    }

    function fisherYates(_array: string[]): string[]{
        let out: string[] = _array;
        for (let i: number = out.length-1; i > 0; i--){
            let j: number = Math.round(Math.random()*i);
            let zwischen: string = out[i];
            out[i] = out[j];
            out[j] = zwischen;
        }
        return out;
    }

    function endGame(): void {
        Spielfeld.style.display = "none";
        let jetzt: number = Date.now();
        let zeitInSekunden: number = jetzt-SpielZeit;
        timerSpan.innerHTML = Math.floor(zeitInSekunden/1000)+"";
        Gewonnen.style.display = "block";
    }
    
}