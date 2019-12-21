import mongoose = require("mongoose");
import { Disorder, DisorderModel } from "../models/disorder.model";

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

export class DisorderRepository {
    constructor() {
        const host = process.env.MONGO_DB_HOST;
        const port = process.env.MONGO_DB_PORT;
        const db = process.env.MONGO_DB_DATABASE;

        mongoose.connect(`${host}:${port}/${db}`);
    }

    async getDisorder(shortname: string): Promise<Disorder> {
        return DisorderModel.findOne({ shortname });
    }

    async getDisorders(): Promise<Disorder[]> {
        return DisorderModel.find({});
    }

    async getDisorderById(id: string): Promise<Disorder> {
        return DisorderModel.findOne({ _id: id });
    }

    async addDisorder(disorder: Disorder): Promise<Disorder> {
        return DisorderModel.create(disorder);
    }

    async updateDisorder(id: string, disorder: Disorder): Promise<Disorder> {
        return DisorderModel.updateOne({ _id: id }, disorder);
    }

    async deleteDisorder(id: string): Promise<any> {
        return DisorderModel.findByIdAndRemove({ _id: id });
    }
}
