const express = require('express');
const cors = require("cors");
const routes = require("./routes"); // leva ponto barra porque é um ficheiro e não um pacote

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);


 
app.listen(3333); 