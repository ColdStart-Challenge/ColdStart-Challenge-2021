const { getUser } = require('../shared/user-utils');

const { QueueServiceClient } = require('@azure/storage-queue')

module.exports = async function (context, req) {
  try {
    context.log(context);
    context.log(context.body.IcecreamId);

    // Get the user details from the request
    const user = getUser(req);
    
    // Retrieve the connection from an environment
    // variable called AZURE_STORAGE_CONNECTION_STRING
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    // Create a unique name for the queue
    const queueName = 'preorder';

    // Instantiate a QueueServiceClient which will be used
    // to create a QueueClient and to list all the queues
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

    // Get a QueueClient which will be used
    // to create and manipulate a queue
    const queueClient = queueServiceClient.getQueueClient(queueName);

    // Create the queue
    await queueClient.createIfNotExists();

    // Create order
    // Get the pre-order from the request
    const ret = {
      User: user.userDetails,
      Date: new Date().toISOString(),
      IcecreamId: context.body.IcecreamId,
      Status: 'New',
      DriverId: null,
      FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
      LastPosition: null,
    };

    context.log(ret);
    context.log(JSON.stringify(ret));

    // Add a message to the queue
    const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(ret));

    // Set http response to 201
    context.res.status(201);

    // Update order id from response
    ret.Id = sendMessageResponse.messageId;

    // Set response body
    context.res.body = ret;

  } catch (error) {
    context.res.status(500).send(error);
  }

};