import { DoughChef } from "./personels/dough-chef.model";
import { ToppingChef } from "./personels/topping-chef.model";
import { Oven } from './personels/oven.model';
import { Server } from "./personels/server.model";
import doughController from '../controllers/dough.controller';
import { DoughQueue } from "./queues/dough-queue.model";
import { ToppingQueue } from "./queues/topping-queue.model";
import * as orders from '../orders.json';
import { ServingQueue } from "./queues/serving-queue.model";
import { OvenQueue } from "./queues/oven-queue.model";

export class Restaurant {
    //Personnels
    doughChefs: Array<DoughChef> = []
    toppingChef: Array<ToppingChef> = []
    ovens: Array<Oven> = []
    servers: Array<Server> = []

    //Queues
    doughQueue: DoughQueue = new DoughQueue();
    toppingQueue: ToppingQueue = new ToppingQueue();
    servingQueue: ServingQueue = new ServingQueue();
    ovenQueue: OvenQueue = new OvenQueue()


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
        orders.pizzas.forEach(() => this.doughQueue.push())
        doughController.prepareDough()
    }
}