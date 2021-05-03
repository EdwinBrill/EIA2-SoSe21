var MemoryFormElements;
(function (MemoryFormElements) {
    var StartButton;
    var PairSelect;
    var SizeSlider;
    var CardColorPicker;
    var FontColorPicker;
    var BackGColorPicker;
    var FontPicker;
    var Settings;
    var Spielfeld;
    var Gewonnen;
    var timerSpan;
    var PaarAnzahl;
    var score = 0;
    var KartenStapel = [];
    var clickedArray = [];
    var SpielZeit;
    var Form;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        StartButton = document.getElementById("StartButton");
        PairSelect = document.getElementById("pairInput");
        SizeSlider = document.getElementById("cardSize");
        CardColorPicker = document.getElementById("cardColor");
        FontColorPicker = document.getElementById("fontColor");
        BackGColorPicker = document.getElementById("backgColor");
        FontPicker = document.getElementById("KartenFont");
        Settings = document.getElementById("Einstellungen");
        Spielfeld = document.getElementById("container");
        Gewonnen = document.getElementById("gewonnen");
        timerSpan = document.getElementById("timerSpan");
        SpielZeit = Date.now();
        StartButton.addEventListener("click", createFormData);
        //document.getElementById(StartButton).addEventListener("click");
        //let scoreN: number = 0;
        //clickedArray: HTMLDivElement[] = []; 
    }
    function createFormData() {
        Form = new FormData(document.forms[0]);
        Form.append("pairs", PairSelect.value);
        Form.append("size", SizeSlider.value);
        Form.append("backCol", BackGColorPicker.value);
        Form.append("kartCol", CardColorPicker.value);
        Form.append("textCol", FontColorPicker.value);
        Form.append("font", FontPicker.value);
        startGame();
    }
    function startGame() {
        PaarAnzahl = +Form.get("pairs");
        var Abstand = 4;
        var indizes = [];
        if (PaarAnzahl >= 5 && PaarAnzahl <= 25) {
            Settings.style.display = "none";
            Spielfeld.style.display = "block";
            Spielfeld.style.backgroundColor = Form.get("backCol") + "";
            for (var i = 0; i < PaarAnzahl * 2; i++) {
                indizes.push(i + "");
            }
            indizes = fisherYates(indizes);
            for (var i = 0; i < PaarAnzahl * 2; i++) {
                var Karte = document.createElement("div");
                var KartenSize = +Form.get("size") * 10 + 40;
                Karte.style.width = KartenSize + "px";
                Karte.style.height = KartenSize + "px";
                Karte.style.position = "absolute";
                var maxwidth = Math.floor(1280 / (KartenSize + Abstand));
                Karte.style.backgroundColor = CardColorPicker.value;
                Karte.style.left = (i % maxwidth) * KartenSize + (i % maxwidth) * Abstand + "px";
                Karte.style.top = Math.floor(i / maxwidth) * KartenSize + Math.floor(i / maxwidth) * Abstand + "px";
                Karte.classList.add("karte");
                Karte.id = indizes[i];
                var front = document.createElement("div");
                var frontText = document.createElement("p");
                frontText.innerHTML = Math.floor(+Karte.id / 2) + "";
                frontText.style.color = Form.get("textCol") + "";
                frontText.style.fontFamily = Form.get("font") + "";
                frontText.style.fontSize = Math.floor(KartenSize / 2) + "px";
                frontText.style.position = "relative";
                frontText.style.top = -KartenSize / 2 + "px";
                front.style.position = "absolute";
                front.style.width = "100%";
                front.style.height = "100%";
                front.style.textAlign = "center";
                front.appendChild(frontText);
                Karte.appendChild(front);
                var ruecken = document.createElement("div");
                ruecken.style.position = "absolute";
                ruecken.style.width = "100%";
                ruecken.style.height = "100%";
                ruecken.style.backgroundColor = Form.get("kartCol") + "";
                Karte.appendChild(ruecken);
                Karte.addEventListener("click", function () {
                    turnCard(this);
                });
                KartenStapel.push(Karte);
                Spielfeld.appendChild(Karte);
            }
        }
        else {
            alert("Bitte eine Zahl zwsichen 5 und 25 angeben!");
        }
    }
    function turnCard(_Karte) {
        if (clickedArray.length < 2) {
            clickedArray.push(_Karte);
            var ruecken = _Karte.getElementsByTagName("div")[1];
            ruecken.style.display = "none";
            if (clickedArray.length == 2) {
                setTimeout(function () {
                    var charArray = [];
                    for (var _i = 0, clickedArray_1 = clickedArray; _i < clickedArray_1.length; _i++) {
                        var Karte = clickedArray_1[_i];
                        charArray.push(Karte.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML);
                    }
                    if (charArray[0] == charArray[1]) {
                        for (var _a = 0, clickedArray_2 = clickedArray; _a < clickedArray_2.length; _a++) {
                            var Karte = clickedArray_2[_a];
                            Karte.style.display = "none";
                        }
                        score++;
                        console.log(score);
                        if (score >= PaarAnzahl) {
                            endGame();
                        }
                        clickedArray = [];
                    }
                    else {
                        for (var _b = 0, clickedArray_3 = clickedArray; _b < clickedArray_3.length; _b++) {
                            var Karte = clickedArray_3[_b];
                            var ruecken_1 = Karte.getElementsByTagName("div")[1];
                            ruecken_1.style.display = "block";
                        }
                        clickedArray = [];
                    }
                }, 2000);
            }
        }
    }
    function fisherYates(_array) {
        var out = _array;
        for (var i = out.length - 1; i > 0; i--) {
            var j = Math.round(Math.random() * i);
            var zwischen = out[i];
            out[i] = out[j];
            out[j] = zwischen;
        }
        return out;
    }
    function endGame() {
        Spielfeld.style.display = "none";
        var jetzt = Date.now();
        var zeitInSekunden = jetzt - SpielZeit;
        timerSpan.innerHTML = Math.floor(zeitInSekunden / 1000) + "";
        Gewonnen.style.display = "block";
    }
})(MemoryFormElements || (MemoryFormElements = {}));
//# sourceMappingURL=script.js.map