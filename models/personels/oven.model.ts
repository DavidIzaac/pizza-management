import { restaurant } from "../..";
import ovenService from "../../services/oven.service";

export class Oven {

    constructor() { }
    isAvailable: boolean = true;

    cookPizza() {
        this.isAvailable = false;
        restaurant.ovenQueue.pop();
        return ovenService.ovenMaker()
    }

}