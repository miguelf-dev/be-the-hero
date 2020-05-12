//Controller com os métodos especificos de cada ONG.
//Está á parte do outro controller para respeitar não ultrapassar os 5 métodos por controller


const connection = require("../database/connection");               //ligacao com a BD

module.exports = {

    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection("incidents")
            .where("ong_id", ong_id)
            .select("*");                                             //todos os incidents relativo à ong com este ID
        
        return response.json(incidents);
    }
}