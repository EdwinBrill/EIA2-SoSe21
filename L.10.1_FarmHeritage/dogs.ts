namespace macdonaldHeritage{
    export class dogs extends animals {
        constructor(_name: string, _food: string, _amount: number) {
            super(_name, _food, _amount);
        }
        doSpecialAction(): void {
            console.log("The dog is not as cool as the cat")
        }
    }
}