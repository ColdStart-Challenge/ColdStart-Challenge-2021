const data = require('../shared/order-cosmos-data');

/*  This function will 'process' all accepted customer orders and send them to the production line.
    After processing, the orders will be updated to the 'Ready' state.
    The function will be triggered by a timer.
*/
module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('JavaScript is running late!');
    }

    // Process all accepted customer orders - for sake of demonstration purposes just update their status
    await data.produceOrders();

    context.log('JavaScript timer trigger function ran!', timeStamp);
};