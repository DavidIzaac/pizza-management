import { restaurant } from '../index';
import toppingController from './toppings.controller';
import { DoughChef } from '../models/personels/dough-chef.model';
import doughService from '../services/dough.service';
import { ProcessLogger } from '../helpers/process-logger.helper';
import { queuesManager } from '../index';


class DoughController extends ProcessLogger {

  async startDough() {
    this.saveGlobalTime()
    const availableDoughChef = restaurant.doughChefs.filter(chef => chef.isAvailable);
    availableDoughChef.forEach(chef => this.checkDoughQueue(chef))
  }

  async checkDoughQueue(chef: DoughChef) {
    if (chef.isAvailable && queuesManager.doughQueue.pizzas.length > 0) {
      const pizza = queuesManager.doughQueue.pop();
      try {
        this.printProcessStartTime(pizza.id, 'Dough', new Date())
        this.saveOrderTime(pizza.id)
        await this.doTask(chef);
        this.printProcessFinishTime(pizza.id, 'Dough', new Date())
        chef.isAvailable = true;
        this.checkDoughQueue(chef)
        toppingController.prepareTopping(pizza);
      } catch (e) {
        console.log(e);
      }
    }
  }

  private doTask(chef: DoughChef) {
    chef.isAvailable = false
    return doughService.doughMaker();
  }

  private saveGlobalTime() {
    restaurant.globalReport['start'] = new Date();
  }

  private saveOrderTime(pizzaId) {
    restaurant.ordersReport.push({ pizzaId: pizzaId, start: new Date() })
  }
}

const doughController = new DoughController();
export default doughController;


