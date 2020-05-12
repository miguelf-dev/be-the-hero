
const crypto = require("crypto");                       //Este pacote serve para criptografia mas podemos usar um método dele só para gerar uma string random (para usar com ID)
const connection = require("../database/connection");    //ligacao com a BD


module.exports = {

    //por norma chama-se index ao método que lista todas as entradas
    async index(request, response) {
        const ongs = await connection("ongs").select("*");
    
        return response.json(ongs);
    },






    async create(request, response) {                      //como o insert pode demorar algum tempo, definimos a funcao como async para só retornar o resultado depois de o insert ter terminado

        /* const data = request.body;
        console.log(data); */

        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        //console.log(id);


        await connection("ongs").insert({                   //await indica que a funcao deve acabar de realizar esta parte e só depois fazer o return
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });                       //só precisamos retornar o id gerado - para depois cada um usar no login
    }
};