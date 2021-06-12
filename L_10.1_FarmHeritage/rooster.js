"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    class rooster extends macdonaldHeritage.animals {
        constructor(_name, _food, _amount) {
            super(_name, _food, _amount);
        }
        doSpecialAction() {
            console.log("The rooster gives a wake up call");
        }
    }
    macdonaldHeritage.rooster = rooster;
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=rooster.js.map