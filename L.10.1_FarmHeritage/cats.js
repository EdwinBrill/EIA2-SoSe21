"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    class cats extends macdonaldHeritage.animals {
        constructor(_name, _food, _amount) {
            super(_name, _food, _amount);
        }
        doSpecialAction() {
            console.log("The cat gifts you a dead mouse");
        }
    }
    macdonaldHeritage.cats = cats;
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=cats.js.map