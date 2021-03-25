let Subjekte: string[] = ["Harry", "Neville", "Mcgonagall", "Peeves", "Die Maulende Myrte"];
let Verben: string[] = ["sucht", "erblickt", "kuschelt", "erwürgt", "flammbiert"];
let Objekte: string[] = ["etwas", "seine Kröte", "das Klassenzimmer", "den Besen", "die Maulende Myrte"];

let Subjekte_Gedicht: string[] = [];
let Verben_Gedicht: string[] = [];
let Objekte_Gedicht: string[] = [];

function Gedicht_schreiben(): void {

    let Zufallszahl: number;
    let index: number;
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


    let Gedicht: string;
    for (let zaehler: number = 0; zaehler < 5; zaehler++) {
        Gedicht = Subjekte_Gedicht[zaehler] + " " + Verben_Gedicht[zaehler] + " " + Objekte_Gedicht[zaehler];
        console.log(Gedicht);
        }
    }

Gedicht_schreiben();