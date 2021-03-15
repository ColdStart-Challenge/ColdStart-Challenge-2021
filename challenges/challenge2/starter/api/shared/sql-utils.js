const Connection = require('tedious').Connection;
const Request = require('tedious').Request
const { config } = require('./config');

const executeSQL = (sql, params) => new Promise((resolve, reject) => {
  const result = [];

  const connection = new Connection({
    server: config.db_server,
    authentication: {
      type: 'default',
      options: {
        userName: config.db_user,
        password: config.db_password,
      }
    },
    options: {
      database: config.db_database,
      encrypt: true
    }
  });

  const request = new Request(sql, (err) => {
    if (err) {
      reject(err);
    } else {
      if ((result == "" || result == null || result == "null")) result = "[]";
      resolve(result);
    }
  });

  if (params) {
    params.forEach(par => {
      request.addParameter(par.Name, par.Type, par.Value);
    });
  }

  // Handle 'row' event
  request.on('row', function (columns) {
    const obj = {}
    columns.forEach(function (column) {
      if (column.value !== null) {
        const key = column.metadata.colName
        const val = column.value
        obj[key] = val
      }
    });
    result.push(obj)
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

const insertSQL = (sql, params) => new Promise((resolve, reject) => {
  let id = null;

  const connection = new Connection({
    server: config.db_server,
    authentication: {
      type: 'default',
      options: {
        userName: config.db_user,
        password: config.db_password,
      }
    },
    options: {
      database: config.db_database,
      encrypt: true
    }
  });

  const request = new Request(sql, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(id);
    }
  });

  if (params) {
    params.forEach(par => {
      request.addParameter(par.Name, par.Type, par.Value);
    });
  }

  // Handle 'row' event
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
      } else {
        id = column.value;
      }
    });
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

exports.executeSQL = executeSQL;
exports.insertSQL = insertSQL;