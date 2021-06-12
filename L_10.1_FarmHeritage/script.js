"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    let Katze = new macdonaldHeritage.cats("Katze", "Fisch", 3);
    let Huhn = new macdonaldHeritage.chickens("Huhn", "Seeds", 25);
    let Kuh = new macdonaldHeritage.cows("Kuh", "Kettle", 10);
    let Hahn = new macdonaldHeritage.rooster("Hahn", "Seeds", 25);
    let Hund = new macdonaldHeritage.dogs("Hund", "Fleisch", 1);
    let button;
    button = document.getElementById("cowButton");
    button.addEventListener("click", Kuh.doSpecialAction);
    button = document.getElementById("dogButton");
    button.addEventListener("click", Hund.doSpecialAction);
    button = document.getElementById("chickenButton");
    button.addEventListener("click", Huhn.doSpecialAction);
    button = document.getElementById("roosterButton");
    button.addEventListener("click", Hahn.doSpecialAction);
    button = document.getElementById("catButton");
    button.addEventListener("click", Katze.doSpecialAction);
    /*document.getElementById("cowButton").addEventListener("click", Kuh.doSpecialAction);
    document.getElementById("chickenButton").addEventListener("click", Huhn.doSpecialAction);
    document.getElementById("catButton").addEventListener("click", Katze.doSpecialAction);
    document.getElementById("dogButton").addEventListener("click", Hund.doSpecialAction);
    document.getElementById("roosterButton").addEventListener("click", Hahn.doSpecialAction); */
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=script.js.map