import { ReportModel } from '../models/report.model';

class ReportService {

    async saveOrderReport(data, pizzaId) {
        const report = new ReportModel({
            report: data,
            pizzaId: pizzaId
        })
        await report.save();
    }

    async saveGlobalReport(data) {
        const report = new ReportModel({
            report: data,
        })
        await report.save();
    }
}

const reportService = new ReportService();
export default reportService;