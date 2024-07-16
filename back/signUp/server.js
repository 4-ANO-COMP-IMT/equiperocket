const express = require("express");
const { config } = require("dotenv");

const router = require("./routes/routes.js");

config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));
 
app.use("/", router);


const port = process.env.PORT || 9000; 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});