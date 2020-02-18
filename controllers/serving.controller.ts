import { restaurant } from '../index';
import { Server } from '../models/personels/server.model';
import servingService from '../services/serving.service';

class ServingController {

    prepareServing() {
        restaurant.servingQueue.push();
        const availableServer = restaurant.servers.filter(server => server.isAvailable);
        availableServer.forEach(server => this.checkServingQueue(server))
    }

    checkServingQueue(server: Server) {
        if (server.isAvailable && restaurant.servingQueue.pizzas > 0) {
            server.isAvailable = false;
            restaurant.servingQueue.pop();
            return servingService.servingMaker()
                .then(() => {
                    console.log("Serving done, passing it to serve chef...");
                    server.isAvailable = true;
                    this.checkServingQueue(server)
                })
        }
    }
}

const servingController = new ServingController();
export default servingController;
