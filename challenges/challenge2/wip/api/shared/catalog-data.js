/* const fs = require('fs').promises;

async function getCatalog() {
  console.log('using static data.');
  var stringData = await fs.readFile('./shared/catalog.json', 'utf8');
  const data = JSON.parse(stringData);
  return data.icecreams;
}

module.exports = { getCatalog }; */

const { config } = require('../shared/config');
const sql = require('mssql');

async function getCatalog() {
  try {
    let pool = await sql.connect(config.azure_sql_connectionstring);
    let result = await pool.request()
      .query("SELECT * FROM [dbo].[IceCreams]");

    // console.dir(result);
    sql.close();
    return result.recordset;
  } catch (err) {
    console.log(err);
    sql.close();
  }
}

module.exports = { getCatalog };