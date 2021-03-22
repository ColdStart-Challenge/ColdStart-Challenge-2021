const { getUser } = require('../shared/user-utils');
const data = require('../shared/order-data');
const recoData = require('../shared/recommendation-data');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  try {
    // Set reward score to 1 if the recommended product was ordered
    if (req.body.EventId) {
      await recoData.setReward(req.body.EventId, 1);
    }

    // Build the pre-order JSON from the request
    const order = {
      IcecreamId: req.body.Id,
      User: user.userDetails,
      FullAddress: req.body.ShippingAddress,
    };

    // Insert the pre-order in the database
    console.log("Inserting order in database");
    await data.insertOrder(order);

    // Retrieve the full order from the database (with primary key filled)
    console.log("Retrieving order from database");
    const items = await data.getLastOrder(order.User);

    // Add the pre-order JSON document in a queue
    console.log('Queueing order');
    context.bindings.myQueueItem = JSON.stringify(items[0]);

    context.res.status(201).json(items[0]);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
