class ToppingService {
    TOPPING_SERVICE = 4000;
    toppingMaker() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, this.TOPPING_SERVICE);
        })
    }
}

const toppingService = new ToppingService();
export default toppingService;