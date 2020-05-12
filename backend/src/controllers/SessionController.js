
//Login simplificado. Apenas confirma se a ONG existe na BD


const connection = require("../database/connection");               //ligacao com a BD


module.exports = {

    
    async create(request, response) {
        const { id } = request.body

        const ong = await connection("ongs")
            .where("id", id)
            .select("name")
            .first();                                               //usando first é retornado apenas 1 resultado, em vez de um array

        if (!ong) {
            return response.status(400).json({ error: "No ONG found with this ID." });
        }
    
        return response.json(ong);
    }

}