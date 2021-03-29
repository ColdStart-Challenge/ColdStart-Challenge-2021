// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.AZURE_PERSONALIZER_KEY,
  personalizer_baseuri: process.env.AZURE_PERSONALIZER_URL,
};

const sqlConfig = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVERNAME,
  database: 'ColdStart',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

module.exports = { config, sqlConfig };