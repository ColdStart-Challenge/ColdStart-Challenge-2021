// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.PERSONALIZER_KEY,
  personalizer_baseuri: process.env.PERSONALIZER_BASEURI,
};

const sqlConfig = {
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVERNAME,
  database: 'coldstartsql',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

module.exports = { config, sqlConfig };
