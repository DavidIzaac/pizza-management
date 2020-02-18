import { restaurant } from '../index';
import { Oven } from '../models/personels/oven.model';
import servingController from './serving.controller';
import ovenService from '../services/oven.service';

class OvenController {
    prepareOven() {
        restaurant.ovenQueue.push();
        const availableOven = restaurant.ovens.filter(oven => oven.isAvailable);
        availableOven.forEach(oven => this.checkOvenQueue(oven))
    }

    checkOvenQueue(oven: Oven) {
        if (oven.isAvailable && restaurant.ovenQueue.pizzas > 0) {
            oven.isAvailable = false;
            restaurant.ovenQueue.pop();
            return ovenService.ovenMaker()
                .then(() => {
                    console.log("Oven done, passing it to serve chef...");
                    oven.isAvailable = true;
                    this.checkOvenQueue(oven)
                    servingController.prepareServing();
                })
        }
    }
}

const ovenController = new OvenController();
export default ovenController;
