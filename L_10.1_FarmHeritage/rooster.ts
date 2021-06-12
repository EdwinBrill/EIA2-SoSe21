namespace macdonaldHeritage{
    export class rooster extends animals {
        constructor(_name: string, _food: string, _amount: number) {
            super(_name, _food, _amount);
        }
        doSpecialAction(): void {
            console.log("The rooster gives a wake up call")
        }
    }
}