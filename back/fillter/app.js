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

const dbUrl = 'mongodb+srv://darkness:<db_password>@projlp2.3qlyony.mongodb.net/?retryWrites=true&w=majority&appName=ProjLP2'
const options = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(dbUrl, options);
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Conectado ao MongoDB Atlas');
});
db.on('error', (err) => {
    console.error(`Erro ao conectar ao MongoDB Atlas: ${err.message}`);
  });
  
  db.on('disconnected', () => {
    console.log('Desconectado do MongoDB Atlas');
  });
  

app.use("/", router );


const port = process.env.PORT || 6000; 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});