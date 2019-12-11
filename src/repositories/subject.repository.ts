import mongoose = require("mongoose");
import { Subject, SubjectModel } from "../models/subject.model";

export class SubjectRepository {
    constructor() {
        const host = process.env.MONGO_DB_HOST;
        const port = process.env.MONGO_DB_PORT;
        const db = process.env.MONGO_DB_DATABASE;

        mongoose.connect(`${host}:${port}/${db}`);
    }

    public async getSubject(firstName: string, lastName: string): Promise<Subject> {
        return SubjectModel.findOne({ firstName, lastName });
    }

    public async getSubjects(): Promise<Subject[]> {
        return SubjectModel.find({});
    }
}
