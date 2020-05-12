const connection = require("../database/connection");               //ligacao com a BD


module.exports = {

                                                                    //por norma chama-se index ao método que lista todas as entradas
    async index(request, response) {

        const { page = 1 } = request.query;                         //Paginação. Para não retornar todos os incidents de uma vez

        const [count] = await connection ("incidents").count();     //Para termos o nr total de incidents na BD

        

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
			.limit(5)                                               //Desta forma mostra 5 de cada vez
			.offset((page - 1) * 5)                                 //Para confirmar no insomnia usar: http://localhost:3333/incidents?page=1 , page=2
			.select([
				'incidents.*',
				'ongs.name',
				'ongs.email',
				'ongs.whatsapp',
				'ongs.city'
				
			]);

		response.header('X-Total-Count', count['count(*)']);

		return response.json(incidents);
    },




    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;               //dados relativos ao user que está logado por norma vem no cabeçalho do pedido e não no corpo
                                                                    //todo o contexto relativo ao pedido: localização do user, lingua, etc  

        const result = await connection("incidents").insert({       //em result fica o array com a info do insert
            title,
            description,
            value,
            ong_id,
        });

        const id = result[0];                                       //se pegarmos na primeira posição temos o id do incident

        return response.json({ id });
    },




    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection("incidents")              //confirmar se o caso que está a ser apagado pertence á ONG que está logada
            .where("id", id)
            .select("ong_id")
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted."  });
        }
            
        await connection("incidents").where("id", id).delete();

        return response.status(204).send();
    
    }

};