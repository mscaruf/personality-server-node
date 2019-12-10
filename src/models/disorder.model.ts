import * as mongoose from "mongoose";
import "reflect-metadata";
import { prop, Typegoose } from "typegoose";

export class Disorder extends Typegoose {
    @prop()
    public name: string;
    @prop()
    public shortname: string;
    @prop()
    public description?: string;
    @prop()
    public descriptionUrl: string;
    @prop()
    public tags: string[];
}

export const DisorderModel = new Disorder().getModelForClass(Disorder, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "disorders" }
});
