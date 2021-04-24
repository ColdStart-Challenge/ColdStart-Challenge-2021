const data = require('../shared/order-cosmos-data');

module.exports = async function (context, req) {
  try {
    // Get the status filter from the query string
    let status = req.query.status;
    if (!status) {
      status = 'Ready';
    }

    // Get the orders for the given state
    let items = await data.getOrdersByStatus(status);

    // Remove Cosmos DB technical fields when returning results
    items = data.removeTechnicalAttributes(items);
    context.res.status(200).json(items);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
