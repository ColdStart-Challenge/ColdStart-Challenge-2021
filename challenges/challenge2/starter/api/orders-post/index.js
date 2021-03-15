const { getUser } = require('../shared/user-utils');

const data = require('../shared/catalog-data');

module.exports = async function (context, req) {
  try {
    // Get the user details from the request
    const user = getUser(req);
    // Create order
    // Get the pre-order info from the request
    const ret = {
      User: user.userDetails,
      IcecreamId: req.body.IcecreamId,
      Status: 'New',
      DriverId: null,
      FullAddress: req.body.ShippingAddress,
      LastPosition: null,
    };
    const id = await data.postOrder(ret);
    ret.Id = id;
    context.res.status(201).send(ret);

  } catch (error) {
    context.error(error);
    context.res.status(500).send(error);
  }
};