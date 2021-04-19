const data = require('../shared/order-cosmos-data');
const driverData = require('../shared/driver-data');

module.exports = async function (context, req) {
  try {
    // Retrieve the order id from the url
    const orderId = req.params.Id;

    const status = req.body.status;
    const driverId = req.body.driver.driverId;
    const lastPosition = req.body.lastPosition;
    let driverName = null;
    let driverImageUrl = null;

    // Get the order
    console.log('Retrieving order: ' + orderId);
    const order = await data.getOrderById(orderId);
    console.log(order);

    if (driverId) {
      console.log('Driver: ' + driverId);

      // Get driver details
      const driver = await driverData.getDriverById(driverId);
      console.log(driver);

      // Update order driver details
      driverName = driver.length > 0 ? driver[0].name : null;
      driverImageUrl = driver.length > 0 ? driver[0].imageUrl : null;

      console.log(`Driver ${driverName} ${driverImageUrl}`);
    }

    console.log('Updating order');

    await data.updateOrder(order, status, lastPosition, driverId, driverName, driverImageUrl);

    console.log('Done updating order');

    context.res.status(200).send();
  } catch (error) {
    context.res.status(500).send(error);
  }
};
