const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/motorq", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const motorqrouter = require("./routes/motorq");
app.use("/motorq", motorqrouter);

app.listen(3000, () => console.log("Server Started at https://localhost:3000"));
