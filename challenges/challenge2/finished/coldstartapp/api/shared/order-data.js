const { sqlConfig } = require("./config");
const mssql = require('mssql');

async function insertOrder(order) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
  .input('userId', mssql.NVarChar, order.User)
  .input('icecreamId', mssql.Int, order.IcecreamId)
  .input('fullAddress', mssql.NVarChar, order.FullAddress)
  .query(`INSERT INTO dbo.Orders ([User], [IcecreamId], [FullAddress]) VALUES (@userId, @icecreamId, @fullAddress)`);
};

async function getLastOrder(userId) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .input('userId', mssql.NVarChar, userId)
    .query(`SELECT TOP 1 * FROM dbo.orders WHERE [User] = @userId ORDER BY [Date] DESC`);

  return result.recordset;
};

module.exports = { insertOrder, getLastOrder };
