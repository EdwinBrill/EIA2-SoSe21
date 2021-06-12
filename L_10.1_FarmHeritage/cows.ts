namespace macdonaldHeritage{
    export class cows extends animals {
        constructor(_name: string, _food: string, _amount: number) {
            super(_name, _food, _amount);
        }
        doSpecialAction(): void {
            console.log("The cow presumes to be cute as hell!")
        }
    }
}