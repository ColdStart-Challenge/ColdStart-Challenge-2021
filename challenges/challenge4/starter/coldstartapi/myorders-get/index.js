const { getUser } = require('../shared/user-utils');
const data = require('../shared/order-cosmos-data');

module.exports = async function (context, req) {
  try {
    // Get the user information from the header, as specified in SWA
    const user = getUser(req);

    // Get the user's orders, regardless of status
    console.log(`User info: ${user}`);
    let items = await data.getMyOrders(user.userDetails);

    // Remove Cosmos DB technical fields when returning results
    items = data.removeTechnicalAttributes(items);
    context.res.status(200).json(items);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
