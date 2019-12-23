import dotenv from "dotenv";
import express from "express";

// importing global config
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

// read post params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
app.use("/subjects", require("./routes/subjects"));
app.use("/disorders", require("./routes/disorders"));

app.get("/", (req, res) => {
    res.send("Welcome to Personality's backend API!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

// Export our app for testing purposes
export default app;
