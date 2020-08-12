import path from "path";
import "dotenv/config";

// Utilizando a sintaxe mais antiga para exportar o objeto pois, o knex não consegue identificar a
// sintaxe de export default;
module.exports = {
  //Configurando a conexão com o banco de dados
  test: {
    client: "pg",
    connection: "postgres://postgres:docker@localhost:5432/proffy_test",
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },
  development: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },
};
