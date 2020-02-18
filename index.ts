import { Restaurant } from './models/restaurants.model';
import { QueueManager } from './models/queues-manager.model';
import setupDB from './helpers/setup-db.helper';

setupDB()

var restaurant = new Restaurant();
var queuesManager = new QueueManager();
restaurant.addDoughChef()
restaurant.addDoughChef()

restaurant.addToppingChef();
restaurant.addToppingChef();
restaurant.addToppingChef();

restaurant.addOven();

restaurant.addServer()
restaurant.addServer()
export { restaurant, queuesManager }

async function launchApp() {
    restaurant.start();
}
launchApp()

