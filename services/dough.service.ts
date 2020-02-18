class DoughService {
    DOUGH_TIME = 7000;
    doughMaker() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, this.DOUGH_TIME);
        })
    }
}

const doughService = new DoughService()
export default doughService;