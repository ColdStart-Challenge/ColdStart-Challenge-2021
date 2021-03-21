const { getUser } = require('../shared/user-utils');
const { config } = require('../shared/config');
const sql = require('mssql');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  try {
    let pool = await sql.connect(config.azure_sql_connectionstring);
    let qry = await pool.request()
      .input("user", sql.VarChar, user.userDetails)
      .input("iceCreamId", sql.Int, req.body.Id)
      .input("fullAddress", sql.VarChar, req.body.ShippingAddress)
      .query("INSERT INTO [dbo].[Orders] ([User], [IcecreamId], [FullAddress]) VALUES (@user, @iceCreamId, @fullAddress)");

    sql.close();
    context.res.status(201);
    context.done();
  } catch (err) {
    console.error(err);
    sql.close();
    context.res.status(500).send(err);
  }
};