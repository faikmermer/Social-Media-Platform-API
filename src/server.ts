import dotenv from "dotenv";
import express from "express";
import route from "./routes/route";

dotenv.config();

const connectDB = require("./configDB");
connectDB();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(route);

app.listen(port, () => console.log(`Server running on port ${port}`));
