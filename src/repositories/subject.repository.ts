import mongoose = require("mongoose");
import { Subject, SubjectModel } from "../models/subject.model";

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

export class SubjectRepository {
    constructor() {
        const host = process.env.MONGO_DB_HOST;
        const port = process.env.MONGO_DB_PORT;
        const db = process.env.MONGO_DB_DATABASE;

        mongoose.connect(`${host}:${port}/${db}`);
    }

    async getSubject(firstName: string, lastName: string): Promise<Subject> {
        return SubjectModel.findOne({ firstName, lastName });
    }

    async getSubjectById(id: string): Promise<Subject> {
        return SubjectModel.findOne({ _id: id });
    }

    async getSubjects(): Promise<Subject[]> {
        return SubjectModel.find({});
    }

    async addSubject(subject: Subject): Promise<Subject> {
        return SubjectModel.create(subject);
    }

    async updateSubject(id: string, subject: Subject): Promise<Subject> {
        return SubjectModel.updateOne({ _id: id }, subject);
    }

    async deleteSubject(id: string): Promise<any> {
        return SubjectModel.findByIdAndRemove({ _id: id });
    }

    async deleteAllSubjectsByFirstAndLastName(firstName: string, lastName: string): Promise<any> {
        return SubjectModel.deleteMany({ firstName, lastName });
    }
}
