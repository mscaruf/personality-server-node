import * as mongoose from "mongoose";
import "reflect-metadata";
import { prop, Typegoose } from "typegoose";

export class Disorder extends Typegoose {
    @prop()
    name: string;
    @prop()
    shortname: string;
    @prop()
    description?: string;
    @prop()
    descriptionUrl: string;
    @prop()
    tags: string[];
}

export const DisorderModel = new Disorder().getModelForClass(Disorder, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "disorders" }
});
