import * as mongoose from "mongoose";
import "reflect-metadata";
import { prop, Typegoose } from "typegoose";

export class Subject extends Typegoose {
    @prop()
    firstName: string;
    @prop()
    lastName: string;
    @prop()
    tags: string[];
}

export const SubjectModel = new Subject().getModelForClass(Subject, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "subjects" }
});
