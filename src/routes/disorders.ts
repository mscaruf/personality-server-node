import express from "express";

import { DisorderRepository } from "../repositories/disorder.repository";

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
    })
});

module.exports = app;
