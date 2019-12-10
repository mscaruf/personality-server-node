import mongoose = require("mongoose");
import { Disorder, DisorderModel } from "../models/disorder.model";

export class DisorderRepository {
    constructor() {
        const host = process.env.MONGO_DB_HOST;
        const port = process.env.MONGO_DB_PORT;
        const db = process.env.MONGO_DB_DATABASE;

        mongoose.connect(`${host}:${port}/${db}`);
    }

    public async getDisorder(shortname: string): Promise<Disorder> {
        return DisorderModel.findOne({ shortname });
    }

    public async getDisorders(): Promise<Disorder[]> {
        return DisorderModel.find({});
    }
}
