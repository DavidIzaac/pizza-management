export class Queue {
    pizzas: number = 0;
    constructor() {
    }

    pop() {
        if (this.pizzas > 0) {
            this.pizzas--;
        }
    }

    push() {
        this.pizzas++
    }
}