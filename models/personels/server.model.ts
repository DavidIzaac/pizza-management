import { restaurant } from "../..";
import servingService from "../../services/serving.service";

export class Server {

    constructor() { }
    isAvailable: boolean = true;

    servePizza() {
        this.isAvailable = false;
        restaurant.servingQueue.pop();
        return servingService.servingMaker();
    }
}