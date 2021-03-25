var Subjekte = ["Harry", "Neville", "Mcgonagall", "Peeves", "Die Maulende Myrte"];
var Verben = ["sucht", "erblickt", "kuschelt", "erwürgt", "flammbiert"];
var Objekte = ["etwas", "seine Kröte", "das Klassenzimmer", "den Besen", "die Maulende Myrte"];
var Subjekte_Gedicht = [];
var Verben_Gedicht = [];
var Objekte_Gedicht = [];
function Gedicht_schreiben() {
    var Zufallszahl;
    var index;
    index = Subjekte.length - 1;
    while (Subjekte_Gedicht.length < 5) {
        Zufallszahl = Math.floor(Math.random() * index);
        Subjekte_Gedicht.push(Subjekte[Zufallszahl]);
        Subjekte.splice(Zufallszahl, 1);
        index = index - 1;
    }
    index = Verben.length - 1;
    while (Verben_Gedicht.length < 5) {
        Zufallszahl = Math.floor(Math.random() * index);
        Verben_Gedicht.push(Verben[Zufallszahl]);
        Verben.splice(Zufallszahl, 1);
        index = index - 1;
    }
    index = Objekte.length - 1;
    while (Objekte_Gedicht.length < 5) {
        Zufallszahl = Math.floor(Math.random() * index);
        Objekte_Gedicht.push(Objekte[Zufallszahl]);
        Objekte.splice(Zufallszahl, 1);
        index = index - 1;
    }
    var Gedicht;
    for (var zaehler = 0; zaehler < 5; zaehler++) {
        Gedicht = Subjekte_Gedicht[zaehler] + " " + Verben_Gedicht[zaehler] + " " + Objekte_Gedicht[zaehler];
        console.log(Gedicht);
    }
}
Gedicht_schreiben();
//# sourceMappingURL=script.js.map