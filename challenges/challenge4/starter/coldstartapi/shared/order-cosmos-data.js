const { config, cosmosConfig } = require("./config");
const cosmosdb = require("./cosmosdb-utils");

const data = {
  orders: [],
};

// helper function to get a Cosmos DB data access object
const getDao = () => {
  console.log('Connecting to database.');
  return new cosmosdb(cosmosConfig.cosmosdb_databaseId, cosmosConfig.cosmosdb_ordersContainerId);
}

/**
 * Add a new order to the database
 * @param {order} order - JSON document representing customer order to be created
 * @return {order} JSON document representing the newly created customer order
 */
async function addOrder(order) {
  const dao = getDao();
  
  const newOrder = await dao.addItem(order);
  return newOrder;
};

/**
 * Process all orders with status 'Accepted'. For demo purposes we're just updating the status to 'Ready'
 */
async function produceOrders() {
  const dao = getDao();

  // Get all orders with status 'Accepted'
  const acceptedOrders = await getOrdersByStatus('Accepted');

  // Update all orders to 'Ready' status
  acceptedOrders.forEach(async (order) => {
    console.log(`Updating order ${order.id} to Ready`);
    await updateOrder(order, 'Ready');
  });
}

/**
 * Get a customer order by its primary key (id)
 * 
 * @param {string} orderId 
 * @returns JSON document representing the customer order
 */
async function getOrderById(orderId) {
  const dao = getDao();

  // Get all orders with status 'Accepted'
  const orders = await dao.find(`SELECT * FROM c WHERE lower(c.id) = lower('${orderId}')`);

  if (orders.length > 0) {
    return orders[0];
  } else {
    return null;
  }
}

/**
 * Update a customer order
 * @param {order} order - customer order to update
 * @param {string} newStatus - new order status
 * @param {string} newLastPosition - new driver last position
 * @param {string} newDriverId - new driver id
 * @param {string} newDriverName - new driver name
 * @param {string} newDriverImageUrl - new driver image URL
 */
async function updateOrder(order, newStatus = null, newLastPosition = null, newDriverId = null, newDriverName = null, newDriverImageUrl = null) {
  const dao = getDao();

  if (newStatus) {
    order.status = newStatus;
  }
  if (newLastPosition) {
    order.lastPosition = newLastPosition;
  }
  if (newDriverId) {
    order.driver.driverId = newDriverId;
    order.driver.name = newDriverName;
    order.driver.imageUrl = newDriverImageUrl;
  }

  await dao.updateItem(order, 'id');
  console.log('Order updated');
}

/**
 * Get all customer orders with a given status
 * @param {string} status 
 * @returns collection of customer orders
 */
async function getOrdersByStatus(status) {
  const dao = getDao();

  // Get all orders with status
  let orders = await dao.find(`SELECT * FROM c WHERE c.status = '${status}'`);

  return orders;
}
/**
 * Get all orders for a given user
 * @param {string} userName - user name
 * @returns collection of customer orders
 */
async function getMyOrders(userName) {
  let orders = null;

  if (config.no_database) {
    orders = data.orders.find((order) => {
      order.Status == status;
    });
  } else {
    console.log('Connecting to database.');
    const dao = getDao();
    // Get all orders with status
    orders = await dao.find(`SELECT * FROM c WHERE c.user = '${userName}'`);
  }

  return orders;
}

/**
 * Remove Cosmos DB technical fields from the order collection
 * @param {order} orders 
 * @returns order collection without the Cosmos DB technical fields
 */
function removeTechnicalAttributes(orders) {
  orders.forEach(element => {
    delete element._rid;
    delete element._self;
    delete element._etag;
    delete element._attachments;
    delete element._ts;
  });

  return orders;
}

module.exports = { addOrder, produceOrders, getOrdersByStatus, getOrderById, getMyOrders, updateOrder, removeTechnicalAttributes };
