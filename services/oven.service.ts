class OvenService {
    OVEN_TIME = 10000;
    ovenMaker() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, this.OVEN_TIME);
        })
    }
}

const ovenService = new OvenService();
export default ovenService;