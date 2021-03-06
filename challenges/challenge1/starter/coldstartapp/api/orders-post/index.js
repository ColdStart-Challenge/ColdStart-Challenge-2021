const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  console.log(req.body);
  const order = {
    "IcecreamId": req.body.itemId
  }

  // TODO: add the pre-order JSON document in a queue

  context.res.status(201);
  context.res.body = order;
};
