const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController"); 
const SessionController = require("./controllers/SessionController"); 

const routes = express.Router();





/* routes.get("/", (request, response) => {
    return response.json({
        evento: "Semana OmniStack 11.0",
        code_ninja: "Miguel"
    });
}); */




routes.get("/ongs", OngController.index);                               //método index vai listar todas as ongs
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index);                               //método index vai listar todas as ongs
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete); 

routes.get("/profile", ProfileController.index); 

routes.post("/session", SessionController.create);




module.exports = routes;