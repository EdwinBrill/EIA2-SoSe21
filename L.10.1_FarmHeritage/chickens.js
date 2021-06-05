"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    class chickens extends macdonaldHeritage.animals {
        constructor(_name, _food, _amount) {
            super(_name, _food, _amount);
        }
        doSpecialAction() {
            console.log("The chicken lays an egg");
        }
    }
    macdonaldHeritage.chickens = chickens;
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=chickens.js.map