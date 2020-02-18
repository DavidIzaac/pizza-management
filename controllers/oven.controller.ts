import { restaurant } from '../index';
import { Oven } from '../models/personels/oven.model';
import servingController from './serving.controller';
import ovenService from '../services/oven.service';
import { ProcessLogger } from '../helpers/process-logger.helper';
import { queuesManager } from '../index';


class OvenController extends ProcessLogger {
    startOven(pizza) {
        queuesManager.ovenQueue.push(pizza);
        const availableOven = restaurant.ovens.filter(oven => oven.isAvailable);
        availableOven.forEach(oven => this.checkOvenQueue(oven))
    }

    async checkOvenQueue(oven: Oven) {
        if (oven.isAvailable && queuesManager.ovenQueue.pizzas.length > 0) {
            const pizza = queuesManager.ovenQueue.pop();
            try {
                this.printProcessStartTime(pizza.id, 'Oven', new Date())
                await this.doTask(oven);
                this.printProcessFinishTime(pizza.id, 'Oven', new Date())
                oven.isAvailable = true;
                this.checkOvenQueue(oven)
                servingController.startServing(pizza);
            } catch (e) {
                console.log(e);

            }
        }
    }

    private doTask(oven: Oven) {
        oven.isAvailable = false
        return ovenService.ovenMaker();
    }
}

const ovenController = new OvenController();
export default ovenController;
