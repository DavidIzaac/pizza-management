import { restaurant } from '../index';
import { ToppingChef } from '../models/personels/topping-chef.model';
import ovenController from './oven.controller';

class ToppingController {

  prepareTopping() {
    restaurant.toppingQueue.push();
    const availableDoughChef = restaurant.toppingChef.filter(chef => chef.isAvailable);
    availableDoughChef.forEach(chef => this.checkToppingQueue(chef))
  }

  checkToppingQueue(chef: ToppingChef) {
    if (chef.isAvailable && restaurant.toppingQueue.pizzas > 0) {
      return chef.addToppingToPizza()
        .then(() => {
          console.log("Topping done, passing it to serve chef...");
          chef.isAvailable = true;
          this.checkToppingQueue(chef)
          ovenController.prepareOven();
        })
    }
  }
}

const toppingController = new ToppingController();
export default toppingController;
