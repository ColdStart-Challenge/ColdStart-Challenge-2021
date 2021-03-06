const { getUser } = require('../shared/user-utils');
const { config } = require('../shared/config');
const { QueueServiceClient } = require('@azure/storage-queue');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  console.log(req.body);
  const order = {
    "Id": uuidv4(),
    "User": user.userDetails,
    "Date": new Date().toISOString(),
    "IcecreamId": req.body.itemId,
    "Status": "New",
    "DriverId": null,
    "FullAddress": "1 Microsoft Way, Redmond, WA 98052, USA",
    "LastPosition": null
  }

  // Azure storage queue settings
  const connectionString = config.azure_storage_connectionstring;
  console.log(connectionString);
  const queueName = "pre-order"

  // Get queue service client
  const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

  // Get queue client
  const queueClient = queueServiceClient.getQueueClient(queueName);
  
  // Add the pre-order JSON document in a queue
  try{
    await queueClient.sendMessage(JSON.stringify(order));
    context.res.status(201);
    context.res.body = order;
  } catch (error) {
    context.res.status(500).send(error);
  }
};
