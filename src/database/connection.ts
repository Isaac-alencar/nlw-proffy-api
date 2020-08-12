import knex from "knex";

var environment = process.env.NODE_ENV || "developement";
var config = require("../../knexfile")[environment];

const database = knex(config);

export default database;
