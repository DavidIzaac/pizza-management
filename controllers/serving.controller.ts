import { restaurant } from '../index';
import { Server } from '../models/personels/server.model';
import servingService from '../services/serving.service';
import { ProcessLogger } from '../helpers/process-logger.helper';
import getMinutesAndSecondes from '../helpers/times-calculation.helper';
import { queuesManager } from '../index';
import reportService from '../services/report.service';


class ServingController extends ProcessLogger {

    startServing(pizza) {
        queuesManager.servingQueue.push(pizza);
        const availableServer = restaurant.servers.filter(server => server.isAvailable);
        availableServer.forEach(server => this.checkServingQueue(server))
    }

    async checkServingQueue(server: Server) {
        if (server.isAvailable && queuesManager.servingQueue.pizzas.length > 0) {
            const pizza = queuesManager.servingQueue.pop();
            try {
                this.printProcessStartTime(pizza.id, 'Serving', new Date())
                await this.doTask(server)
                this.saveOrderTime(pizza.id);
                this.printOrderReport(pizza.id)
                this.printProcessFinishTime(pizza.id, 'Serving', new Date())
                server.isAvailable = true;
                this.checkServingQueue(server)
            } catch (e) {
                console.log(e);
            }
        } else if (this.isFinishedOrders()) {
            this.saveGlobalTime()
            this.printFinalReport();
        }
    }

    private doTask(server: Server) {
        server.isAvailable = false
        return servingService.servingMaker();
    }

    async printFinalReport() {
        const globalReport = restaurant.globalReport;
        const preparationTime = getMinutesAndSecondes(globalReport['start'], globalReport['end']);
        await reportService.saveGlobalReport(preparationTime)
        console.log(`The whole order has taken:${preparationTime.minutes} minutes and ${preparationTime.secondes} seconds`);
    }

    async printOrderReport(pizzaId) {
        const orderReport = restaurant.ordersReport.find(order => order.pizzaId === pizzaId);
        const preparationTime = getMinutesAndSecondes(orderReport.start, orderReport.end);
        await reportService.saveOrderReport(preparationTime, pizzaId)
        console.log(`The preparation time of pizza ${pizzaId} has taken: ${preparationTime.minutes} minutes and ${preparationTime.secondes} secondes`);
    }

    private saveGlobalTime() {
        restaurant.globalReport['end'] = new Date();
    }

    private saveOrderTime(pizzaId) {
        const orderTime = restaurant.ordersReport.find(order => order.pizzaId === pizzaId);
        orderTime.end = new Date();;
    }

    private isFinishedOrders() {
        return restaurant.doughChefs.every(chef => chef.isAvailable) && restaurant.toppingChef.every(chef => chef.isAvailable) && restaurant.ovens.every(oven => oven.isAvailable) && restaurant.servers.every(server => server.isAvailable)

    }

}

const servingController = new ServingController();
export default servingController;
