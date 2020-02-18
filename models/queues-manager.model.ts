import { DoughQueue } from "./queues/dough-queue.model";
import { ToppingQueue } from "./queues/topping-queue.model";
import { ServingQueue } from "./queues/serving-queue.model";
import { OvenQueue } from "./queues/oven-queue.model";

export class QueueManager {
    doughQueue: DoughQueue = new DoughQueue();
    toppingQueue: ToppingQueue = new ToppingQueue();
    servingQueue: ServingQueue = new ServingQueue();
    ovenQueue: OvenQueue = new OvenQueue()

    constructor() { }
}