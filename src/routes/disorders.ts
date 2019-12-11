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
        res.status(200).send(data);
    }).catch((e) => {
        res.status(404);
        res.send("404: Resource Not Found");
    });
});

module.exports = app;
