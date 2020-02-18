import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;

const reportSchema = new Schema(
    {
        report: { type: Object, required: true },
        pizzaId: { type: String }
    }
);

const ReportModel = mongoose.model("Report", reportSchema, "report");

export { ReportModel }