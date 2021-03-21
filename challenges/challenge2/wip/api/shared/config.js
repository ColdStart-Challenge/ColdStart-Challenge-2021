const process = require("process");

const config = {
    azure_sql_connectionstring: process.env.AZURE_SQL_CONNECTIONSTRING
};

module.exports = { config };