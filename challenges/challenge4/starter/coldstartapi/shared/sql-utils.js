const { sqlConfig } = require("./config");
const { Connection, Request } = require("tedious");

/**
 * Query a SQL database with a specific SELECT query
 * @param {string} sql - SELECT statement to run against the database
 * @returns records - SELECT results collection
 */
const queryDatabase = (sql) => new Promise((resolve, reject) => {
    console.log("Reading rows from the Table...");

    let items = [];

    const connection = new Connection(sqlConfig);

    // Read all rows from table
    const request = new Request(
        sql,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(items);
            }
        }
    );

    request.on("row", columns => {
        var rowObj = {};
        columns.forEach(column => {
            rowObj[column.metadata.colName] = column.value;
        });
        items.push(rowObj);
    });

    connection.on('connect', err => {
        if (err) {
            reject(err);
        }
        else {
            connection.execSql(request);
        }
    });

    connection.connect();
});

/**
 * Execute a SQL statement against a SQL Database
 * @param {string} sql 
 * @returns 
 */
const execSQL = (sql) => new Promise((resolve, reject) => {
    console.log("Executing SQL statement...");

    const connection = new Connection(sqlConfig);

    // Read all rows from table
    const request = new Request(
        sql,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve();
            }
        }
    );

    connection.on('connect', err => {
        if (err) {
            reject(err);
        }
        else {
            connection.execSql(request);
        }
    });

    connection.connect();
});

module.exports = { queryDatabase: queryDatabase, execSQL: execSQL };
