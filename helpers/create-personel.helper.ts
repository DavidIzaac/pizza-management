import { restaurant } from '..';

export default function createPersonel() {
    const serverNumber = parseInt(process.env['SERVER'])
    for (let i = 0; i < serverNumber; i++) {
        restaurant.addServer()
    }

    const ovenNumber = parseInt(process.env['OVEN'])
    for (let i = 0; i < ovenNumber; i++) {
        restaurant.addOven()
    }

    const doughChefNumber = parseInt(process.env['DOUGH_CHEF'])
    for (let i = 0; i < doughChefNumber; i++) {
        restaurant.addDoughChef()
    }

    const toppingChefNumber = parseInt(process.env['TOPPINGS_CHEF'])
    for (let i = 0; i < toppingChefNumber; i++) {
        restaurant.addToppingChef()
    }
}