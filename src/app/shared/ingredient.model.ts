export class Ingredient {
    public name: string;
    public amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
/* Esto se puede poner simplificado de la sgte manera:
export class Ingredient {
    constructor(public name: string, public amount: numer){

    }
}
Es un shortcut que ofrece Typescript*/