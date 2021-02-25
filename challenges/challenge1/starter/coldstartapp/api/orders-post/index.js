const { getUser } = require('../shared/user-utils');

const { QueueServiceClient } = require('@azure/storage-queue')

function getGUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((dt + Math.random() * 16) % 16) | 0; // eslint-disable-line no-bitwise
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16); // eslint-disable-line no-bitwise
  });
  this.guid = uuid;
  console.log(this.guid);
}

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = "sujithq"; //getUser(req);  

  // // Get the pre-order from the request

  const ret = {
    // Id: getGUID().toUpperCase(),
    User: user,
    Date: new Date().toISOString(),
    IcecreamId: context.IcecreamId,
    Status: 'New',
    DriverId: null,
    FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
    LastPosition: null,
  };
  
  // // TODO: add the pre-order JSON document in a queue


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

  // // Create the queue
  // // await queueClient.create();

  // const retStr = JSON.stringify(ret);

  // console.log('Adding message to the queue: ', retStr);

  // // Add a message to the queue
  // await queueClient.sendMessage(retStr);

  context.res.status(201);
};
