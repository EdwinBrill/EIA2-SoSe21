"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    class cows extends macdonaldHeritage.animals {
        constructor(_name, _food, _amount) {
            super(_name, _food, _amount);
        }
        doSpecialAction() {
            console.log("The cow presumes to be cute as hell!");
        }
    }
    macdonaldHeritage.cows = cows;
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=cows.js.map