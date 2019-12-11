import express from "express";

import { SubjectRepository } from "../repositories/subject.repository";

const app = express();

app.get("/", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubjects().then((data) => {
        res.status(200).send(data);
    });
});

app.get("/:firstName/:lastName", (req, res) => {
    const repo = new SubjectRepository();

    repo.getSubject(req.params.firstName, req.params.lastName).then((data) => {
        res.status(200).send(data);
    }).catch((e) => {
        res.status(404);
        res.send("404: Resource Not Found");
    });
});

export default app;
