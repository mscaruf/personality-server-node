import express from "express";

import { DisorderRepository } from "../repositories/disorder.repository";
import { Disorder } from "../models/disorder.model";

const app = express.Router();

app.get("/", (req, res) => {
    const repo = new DisorderRepository();

    repo.getDisorders().then((data) => {
        res.status(200).send(data);
    });
});

app.get("/:shortname", (req, res) => {
    const repo = new DisorderRepository();

    repo.getDisorder(req.params.shortname).then((data) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send("Resource not found.");
        }
    });
});

app.get("/:id", (req, res) => {
    const repo = new DisorderRepository();

    repo.getDisorderById(req.params.id).then((data) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send("Resource not found.");
        }
    });
});

app.post("/", (req, res) => {
    const repo = new DisorderRepository();

    const disorder = new Disorder();
    disorder.populate(req.body);

    repo.addDisorder(disorder).then((data: Disorder) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(406).send("Resource format not valid.");
    });

});

app.put("/:id", (req, res) => {
    const repo = new DisorderRepository();

    const disorder = new Disorder();
    disorder.populate(req.body);

    repo.updateDisorder(req.params.id, disorder).then((data: Disorder) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(406).send("Resource format not valid.");
    });

});

app.delete("/:id", (req, res) => {
    const repo = new DisorderRepository();

    repo.deleteDisorder(req.params.id).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send("Resource not found.");
    });
});

module.exports = app;
