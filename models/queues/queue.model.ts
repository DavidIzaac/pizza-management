export class Queue {
    pizzas = [];
    constructor() {
    }

    pop() {
        if (this.pizzas.length > 0) {
            return this.pizzas.pop()
        }
    }

    push(pizza) {
        this.pizzas.push(pizza);
    }
}