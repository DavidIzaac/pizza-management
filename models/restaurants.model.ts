import { DoughChef } from "./personels/dough-chef.model";
import { ToppingChef } from "./personels/topping-chef.model";
import { Oven } from './personels/oven.model';
import { Server } from "./personels/server.model";
import doughController from '../controllers/dough.controller';
import * as orders from '../orders.json';
import { queuesManager } from '../index';


export class Restaurant {
    //Personnels
    doughChefs: Array<DoughChef> = []
    toppingChef: Array<ToppingChef> = []
    ovens: Array<Oven> = []
    servers: Array<Server> = []

    //report
    ordersReport = [];
    globalReport = {};

    constructor() { }

    addOven() {
        const oven = new Oven();
        this.ovens.push(oven);
    }

    addServer() {
        const server = new Server();
        this.servers.push(server)
    }

    addToppingChef() {
        const toppingChef = new ToppingChef();
        this.toppingChef.push(toppingChef);
    }

    addDoughChef() {
        const doughChef = new DoughChef();
        this.doughChefs.push(doughChef)
    }

    start() {
        orders.pizzas.forEach((pizza) => queuesManager.doughQueue.push(pizza))
        doughController.startDough()
    }
}