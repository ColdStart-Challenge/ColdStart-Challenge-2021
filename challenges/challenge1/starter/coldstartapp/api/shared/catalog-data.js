const { executeSQL, insertSQL } = require('./sql-utils');
const TYPES = require('tedious').TYPES;

getCatalog = async function () {
  const query = `SELECT Id, Name, Description, ImageUrl FROM Icecreams`;
  return await executeSQL(query);
}

postOrder = async function (order) {

  const query = `INSERT Orders ([User], [Date], [IcecreamId], [Status], [DriverId], [FullAddress], [LastPosition]) OUTPUT INSERTED.Id VALUES (@User, CURRENT_TIMESTAMP, @IcecreamId, @Status, @DriverId, @FullAddress, @LastPosition)`;
  const params = [];
  // Add Param Values
  params.push({ Name: 'User', Type: TYPES.NVarChar, Value: order.User });
  params.push({ Name: 'Status', Type: TYPES.NVarChar, Value: order.Status });
  params.push({ Name: 'IcecreamId', Type: TYPES.Int, Value: order.IcecreamId });
  params.push({ Name: 'FullAddress', Type: TYPES.NVarChar, Value: order.FullAddress });
  params.push({ Name: 'LastPosition', Type: TYPES.NVarChar, Value: null });
  params.push({ Name: 'DriverId', Type: TYPES.Int, Value: null });

  return await insertSQL(query, params);
}

module.exports = { getCatalog, postOrder };