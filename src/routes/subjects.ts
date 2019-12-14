import express from "express";

import { SubjectRepository } from "../repositories/subject.repository";

const app = express.Router();

app.get("/", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubjects().then((data) => {
        res.status(200).send(data);
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
