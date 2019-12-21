import * as mongoose from "mongoose";
import "reflect-metadata";
import { prop, Typegoose } from "typegoose";

export class Subject extends Typegoose {
    @prop({ required: true })
    firstName: string;
    @prop({ required: true })
    lastName: string;
    @prop({ required: true })
    tags: string[];

    populate = (data: any) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.tags = data.tags;
    }
}

export const SubjectModel = new Subject().getModelForClass(Subject, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "subjects" }
});
