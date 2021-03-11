// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  db_user: process.env.db_user,
  db_password: process.env.db_password,
  db_server: process.env.db_server,
  db_database: process.env.db_database,
  personalizer_key: process.env.personalizer_key,
  personalizer_base: process.env.personalizer_base 
};

module.exports = { config };
