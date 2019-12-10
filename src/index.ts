import dotenv from "dotenv";
import express from "express";

import { DisorderRepository } from "./repositories/disorder.repository";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get( "/", ( req, res ) => {
    res.send( "Welcome to Personality's backend API!" );
} );

app.get( "/disorders", (req, res) => {
    const repo = new DisorderRepository();

    repo.getDisorders().then((data) => {
        res.status(200).send(data);
    });
});

app.get( "/disorder/:shortname", (req, res) => {
    const repo = new DisorderRepository();

    repo.getDisorder(req.params.shortname).then((data) => {
        res.status(200).send(data);
    }).catch((e) => {
        res.status(404);
        res.send("404: Resource Not Found");
    });
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
