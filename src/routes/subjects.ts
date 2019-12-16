import express from "express";

import { Disorder } from "../models/disorder.model";
import { Subject } from "../models/subject.model";

import { DisorderRepository } from "../repositories/disorder.repository";
import { SubjectRepository } from "../repositories/subject.repository";

import { getSubjectScore } from "../utils/score.utils";

const app = express.Router();

app.get("/", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubjects().then((data) => {
        res.status(200).send(data);
    });
});

app.get("/score/:id", (req, res) => {
    const subjectRepo = new SubjectRepository();
    const disorderRepo = new DisorderRepository();

    const promises: [Promise<Subject>, Promise<Disorder[]>] = [
        subjectRepo.getSubjectById(req.params.id),
        disorderRepo.getDisorders()
    ];

    Promise.all(promises).then((data: [Subject, Disorder[]]) => {

        const subject = data[0];
        const disorders = data[1];

        res.status(200).send(getSubjectScore(subject, disorders));
    });
});

app.get("/:firstName/:lastName", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubject(req.params.firstName, req.params.lastName).then((data) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send("Resource not found.");
        }
    });
});

module.exports = app;
