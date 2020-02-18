import { restaurant } from '../index';
import toppingController from './toppings.controller';
import { DoughChef } from '../models/personels/dough-chef.model';

class DoughController {

  prepareDough() {
    const availableDoughChef = restaurant.doughChefs.filter(chef => chef.isAvailable);
    availableDoughChef.forEach(chef => this.checkDoughQueue(chef))
  }

  checkDoughQueue(chef: DoughChef) {
    if (chef.isAvailable && restaurant.doughQueue.pizzas > 0) {
      return chef.makeDough()
        .then(() => {
          console.log("Dough done, passing it to topping chef...");
          chef.isAvailable = true;
          this.checkDoughQueue(chef)
          toppingController.prepareTopping();
        })
    }
  }
}

const doughController = new DoughController();
export default doughController;


