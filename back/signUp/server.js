import express, { json } from "express";
import { config } from "dotenv";     

import router from "./routes/routes.js";

config();

import cors from "cors";

const app = express();
app.use(json());
app.use(cors({origin: "*"}));
 
app.use("/", router);


const port = process.env.PORT || 8000; 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});