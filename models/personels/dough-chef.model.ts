import { restaurant } from "../../index";
import doughService from "../../services/dough.service";

export class DoughChef {

    constructor() { }
    isAvailable: boolean = true;

    makeDough() {
        this.isAvailable = false;
        restaurant.doughQueue.pop();
        return doughService.doughMaker();
    }
}