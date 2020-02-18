import { restaurant } from '../index';
import { ToppingChef } from '../models/personels/topping-chef.model';
import ovenController from './oven.controller';
import toppingService from '../services/topping.service';
import { ProcessLogger } from '../helpers/process-logger.helper';
import { queuesManager } from '../index';


class ToppingController extends ProcessLogger {

  prepareTopping(pizza) {
    queuesManager.toppingQueue.pizzas.push(pizza)
    const availableDoughChef = restaurant.toppingChef.filter(chef => chef.isAvailable);
    availableDoughChef.forEach(chef => this.checkToppingQueue(chef))
  }

  async checkToppingQueue(chef: ToppingChef) {
    if (chef.isAvailable && queuesManager.toppingQueue.pizzas.length > 0) {
      const pizza = queuesManager.toppingQueue.pizzas.pop();
      try {
        this.printProcessStartTime(pizza.id, 'Topping', new Date())
        await this.addToppingToPizza(chef, pizza);
        this.printProcessFinishTime(pizza.id, 'Topping', new Date())
        chef.isAvailable = true;
        this.checkToppingQueue(chef)
        ovenController.startOven(pizza)
      } catch (e) {
        console.log(e);
      }
    }
  }

  async addToppingToPizza(chef: ToppingChef, pizza) {
    if (pizza.toppings.length > 0) {
      pizza.toppings.pop()
      pizza.toppings.pop()
      try {
        await this.doTask(chef)
        this.addToppingToPizza(chef, pizza)
      } catch (e) {
        console.log(e);
      }
    }
  }

  async doTask(chef: ToppingChef) {
    chef.isAvailable = false;
    return toppingService.toppingMaker();
  }
}

const toppingController = new ToppingController();
export default toppingController;
