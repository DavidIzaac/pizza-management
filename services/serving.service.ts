class ServingService {
    SERVING_TIME = 5000;
    servingMaker() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, this.SERVING_TIME);
        })
    }
}

const servingService = new ServingService();
export default servingService;