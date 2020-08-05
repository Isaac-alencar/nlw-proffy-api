import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("subject").notNullable();
    table.decimal("cost").notNullable();
    /**
     * Criando relacionamentos com sqlite e knex!
     * Passo 1: criar um campo na tabela que será a chave estrangeira;
     * Passo 2: referenciar o campo da tabela estrangeira que ele representará,
     * exemplo abaixo references('id);
     * Passo 3: informar a Tabela estrangeira. Exemplo abaixo: inTable("users")
     *
     */
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE") //Atualiza os dados caso a tabela origem mude
      .onDelete("CASCADE"); //Deleta os dados caso a tabela origem mude
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("classes");
}
