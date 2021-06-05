"use strict";
var macdonaldHeritage;
(function (macdonaldHeritage) {
    class dogs extends macdonaldHeritage.animals {
        constructor(_name, _food, _amount) {
            super(_name, _food, _amount);
        }
        doSpecialAction() {
            console.log("The dog is not as cool as the cat");
        }
    }
    macdonaldHeritage.dogs = dogs;
})(macdonaldHeritage || (macdonaldHeritage = {}));
//# sourceMappingURL=dogs.js.map