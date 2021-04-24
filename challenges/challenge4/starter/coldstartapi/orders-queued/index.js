const orderData = require('../shared/order-cosmos-data');
const driverData = require('../shared/driver-data');
const catalogData = require('../shared/catalog-data');

/*  This function will take incoming customer orders from the queue and store them in the backend database (Cosmos DB).
    New orders will be updated to the 'Accepted' state, so that they can be picked up for processing.
    The function is triggered by messages arriving in the Azure Storage Queue.
*/
module.exports = async function (context, myQueueItem) {
  context.log('JavaScript queue trigger function processed work item', myQueueItem);

  // Update order status to 'Accepted'
  myQueueItem.Status = 'Accepted';

  // Get icecream details
  //  for the sake of simplicity we're reading directly from the SQL DB - should be exposed through a separate API
  const icecream = await catalogData.getCatalogItemById(myQueueItem.IcecreamId);

  // Get driver details
  //  for the sake of simplicity we're reading directly from the SQL DB - should be exposed through a separate API
  const driver = await driverData.getDriverById(myQueueItem.DriverId);

  // No this was not created on a Blue Monday ;)
  const newOrder = {
    id: myQueueItem.Id,
    user: myQueueItem.User,
    date: myQueueItem.Date,
    icecream: {
      icecreamId: myQueueItem.IcecreamId,
      name: icecream[0].Name,
      description: icecream[0].Description,
      imageUrl: icecream[0].ImageUrl
    },
    status: myQueueItem.Status,
    driver: {
      driverId: myQueueItem.DriverId,
      name: driver.length > 0 ? driver[0].Name : null,
      imageUrl: driver.length > 0 ? driver[0].ImageUrl : null
    },
    fullAddress: myQueueItem.FullAddress,
    deliveryPosition: null,
    lastPosition: myQueueItem.LastPosition
  };

  // Move order to backend database (Cosmos DB)
  await orderData.addOrder(newOrder);
};