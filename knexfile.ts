import path from "path";

// Utilizando a sintaxe mais antiga para exportar o objeto pois, o knex não consegue identificar a
// sintaxe de export default;

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
