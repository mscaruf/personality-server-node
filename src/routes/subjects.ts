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
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });
});

app.get("/:firstName/:lastName", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubject(req.params.firstName, req.params.lastName).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });
});

app.get("/:id", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubjectById(req.params.id).then((data: Subject) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });
});

app.post("/", (req, res) => {
    const repo = new SubjectRepository();

    const subject = new Subject();
    subject.populate(req.body);

    repo.addSubject(subject).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(406).send("Resource format not valid.");
    });

});

app.put("/:id", (req, res) => {
    const repo = new SubjectRepository();

    const subject = new Subject();
    subject.populate(req.body);

    repo.updateSubject(req.params.id, subject).then((data: Subject) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(406).send("Resource format not valid.");
    });

});

app.delete("/:id", (req, res) => {
    const repo = new SubjectRepository();

    repo.deleteSubject(req.params.id).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });
});

app.delete("/:firstName/:lastName", (req, res) => {
    const repo = new SubjectRepository();

    repo.deleteAllSubjectsByFirstAndLastName(
        req.params.firstName, req.params.lastName).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });

});

module.exports = app;
