// @ts-check
const process = require("process");

const config = {
    azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING
};

// Create connection to database
const sqlConfig = {
    authentication: {
        options: {
            userName: process.env.AZURE_SQL_USER,
            password: process.env.AZURE_SQL_PASSWORD,
        },
        type: "default"
    },
    server: process.env.AZURE_SQL_SERVERNAME,
    options: {
        database: "ColdStart",
        encrypt: true
    }
};

const cosmosConfig = {
    cosmosdb_endpoint: process.env.COSMOSDB_ENDPOINT,
    cosmosdb_key: process.env.COSMOSDB_KEY,
    cosmosdb_databaseId: "thezoocoldstart",
    cosmosdb_ordersContainerId: "coldstart",
    cosmosdb_ordersPartitionKey: "id",
};

module.exports = { config, sqlConfig, cosmosConfig };
