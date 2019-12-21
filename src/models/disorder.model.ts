import * as mongoose from "mongoose";
import "reflect-metadata";
import { prop, Typegoose } from "typegoose";

export class Disorder extends Typegoose {
    @prop({ required: true })
    name: string;
    @prop({ required: true })
    shortname: string;
    @prop({ required: true })
    description: string;
    @prop({ required: true })
    descriptionUrl: string;
    @prop({ required: true })
    tags: string[];

    populate = (data: any) => {
        this.name = data.name;
        this.shortname = data.shortname;
        this.description = data.description;
        this.descriptionUrl = data.descriptionUrl;
        this.tags = data.tags;
    }
}

export const DisorderModel = new Disorder().getModelForClass(Disorder, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "disorders" }
});
