const { getUser } = require('../shared/user-utils');
var uuid = require('uuid');


module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Build the pre-order JSON from the request
  const order = {
    Id: uuid.v4(),
    User: user.userDetails,
    FullAddress: req.body.ShippingAddress,
    Date: new Date().toISOString(),
    IcecreamId: req.body.Id,
    Status: "New",
    DriverId: null,
    LastPosition: null
  };

  try {
    // Add the pre-order JSON document in a queue
    console.log('Queueing order');
    context.bindings.myQueueItem = order;

    context.res.status(201).json(order);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
