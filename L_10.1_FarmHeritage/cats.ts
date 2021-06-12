namespace macdonaldHeritage{
    export class cats extends animals {
        constructor(_name: string, _food: string, _amount: number) {
            super(_name, _food, _amount);
        }
        doSpecialAction(): void {
            console.log("The cat gifts you a dead mouse")
        }
    }
}