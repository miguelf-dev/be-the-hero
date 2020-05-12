
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        
        table.increments();                     //gera id auto-increment
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();   //relacao entre tabelas

        table.foreign('ong_id').references('id').inTable('ongs');    //chave estrangeira
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
