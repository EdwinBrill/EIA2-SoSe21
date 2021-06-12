namespace macdonaldHeritage{
    export class chickens extends animals {
        constructor(_name: string, _food: string, _amount: number) {
            super(_name, _food, _amount);
        }
        doSpecialAction(): void {
            console.log("The chicken lays an egg")
        }
    }
}