namespace macdonaldHeritage{
    export class animals {
        name: string;
        food: string;
        amount: number;

        constructor(_name: string, _food: string, _amount: number) {
            this.name = _name;
            this.food = _food;
            this.amount = _amount;
        }
    }
}