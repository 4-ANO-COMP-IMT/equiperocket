import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://darkness:root@projlp2.3qlyony.mongodb.net/?retryWrites=true&w=majority&appName=ProjLP2', { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", router);

const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
