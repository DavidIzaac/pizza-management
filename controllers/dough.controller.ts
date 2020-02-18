import { restaurant } from '../index';
import toppingController from './toppings.controller';
import { DoughChef } from '../models/personels/dough-chef.model';
import doughService from '../services/dough.service';

class DoughController {

  prepareDough() {
    const availableDoughChef = restaurant.doughChefs.filter(chef => chef.isAvailable);
    availableDoughChef.forEach(chef => this.checkDoughQueue(chef))
  }

  checkDoughQueue(chef: DoughChef) {
    if (chef.isAvailable && restaurant.doughQueue.pizzas > 0) {
      restaurant.doughQueue.pop();
      chef.isAvailable = false
      return doughService.doughMaker()
        .then(() => {
          console.log('Dough Done');
          chef.isAvailable = true;
          this.checkDoughQueue(chef)
          toppingController.prepareTopping();
        })
    }
  }
}

const doughController = new DoughController();
export default doughController;


