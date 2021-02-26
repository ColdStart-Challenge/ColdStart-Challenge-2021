const { getUser } = require('../shared/user-utils');

const { QueueServiceClient } = require('@azure/storage-queue')

module.exports = async function (context, req) {

  context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);
  context.log('Request Headers = ', JSON.stringify(req.headers));

  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  const ret = {
    User: user.userDetails,
    Date: new Date().toISOString(),
    IcecreamId: context.IcecreamId,
    Status: 'New',
    DriverId: null,
    FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
    LastPosition: null,
  };
  
  // Retrieve the connection from an environment
  // variable called AZURE_STORAGE_CONNECTION_STRING
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  // Create a unique name for the queue
  const queueName = 'preorder';

  console.log('Preordering queue: ', queueName);

  // Instantiate a QueueServiceClient which will be used
  // to create a QueueClient and to list all the queues
  const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

  // Get a QueueClient which will be used
  // to create and manipulate a queue
  const queueClient = queueServiceClient.getQueueClient(queueName);

  // Create the queue
  await queueClient.createIfNotExists();

  const retStr = JSON.stringify(ret);

  console.log('Adding message to the queue: ', retStr);

  // Add a message to the queue
  const sendMessageResponse = await queueClient.sendMessage(retStr);

  context.res.status(201);
  ret.Id = sendMessageResponse.messageId;
  context.res.body = ret;
};