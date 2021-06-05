namespace macdonaldHeritage{
    let Katze: cats = new cats("Katze", "Fisch", 3);
    let Huhn: chickens = new chickens("Huhn", "Seeds", 25);
    let Kuh: cows = new cows("Kuh", "Kettle", 10);
    let Hahn: rooster = new rooster("Hahn", "Seeds", 25);
    let Hund: dogs = new dogs("Hund", "Fleisch", 1);

    let button: HTMLButtonElement;

    button = <HTMLButtonElement>document.getElementById("cowButton");
    button.addEventListener("click", Kuh.doSpecialAction);

    button = <HTMLButtonElement>document.getElementById("dogButton");
    button.addEventListener("click", Hund.doSpecialAction);

    button = <HTMLButtonElement>document.getElementById("chickenButton");
    button.addEventListener("click", Huhn.doSpecialAction);

    button = <HTMLButtonElement>document.getElementById("roosterButton");
    button.addEventListener("click", Hahn.doSpecialAction);

    button = <HTMLButtonElement>document.getElementById("catButton");
    button.addEventListener("click", Katze.doSpecialAction);

    /*document.getElementById("cowButton").addEventListener("click", Kuh.doSpecialAction);
    document.getElementById("chickenButton").addEventListener("click", Huhn.doSpecialAction);
    document.getElementById("catButton").addEventListener("click", Katze.doSpecialAction);
    document.getElementById("dogButton").addEventListener("click", Hund.doSpecialAction);
    document.getElementById("roosterButton").addEventListener("click", Hahn.doSpecialAction); */
}