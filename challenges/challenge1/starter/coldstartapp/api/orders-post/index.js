const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  
  // TODO: add the pre-order JSON document in a queue

  context.res.status(201);
};
