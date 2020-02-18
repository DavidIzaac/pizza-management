import { restaurant } from "../..";
import toppingService from "../../services/topping.service";

export class ToppingChef {

    constructor() { }
    isAvailable: boolean = true;

    addToppingToPizza() {
        this.isAvailable = false;
        restaurant.toppingQueue.pop();
        restaurant.toppingQueue.pop();
        return toppingService.toppingMaker();
    }

}