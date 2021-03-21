const process = require("process");

const config = {
    azure_sql_connectionstring: process.env.AZURE_SQL_CONNECTIONSTRING,
    azure_personalizer_key: process.env.AZURE_PERSONALIZER_KEY,
    azure_personalizer_url: process.env.AZURE_PERSONALIZER_URL
};

module.exports = { config };