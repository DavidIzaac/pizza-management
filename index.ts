import { Restaurant } from './models/restaurants.model';
import { QueueManager } from './models/queues-manager.model';
import { setupDB, dropAllCollections } from './helpers/setup-db.helper';
import createPersonel from './helpers/create-personel.helper';
import * as dotenv from 'dotenv';

dotenv.config()

var restaurant = new Restaurant();
var queuesManager = new QueueManager();

export { restaurant, queuesManager }

async function launchApp() {
    try {
        await setupDB()
        await dropAllCollections(); // keep only collection of the previous launch
        createPersonel();
        restaurant.start();
    } catch (err) {
        console.error(err);
    }
}
launchApp()

