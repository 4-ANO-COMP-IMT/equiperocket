const express = require("express");
const dotenv  = require("dotenv");     

const authRoutes = require("./routes/routes.js");

dotenv.config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);


const port =  8000; 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});