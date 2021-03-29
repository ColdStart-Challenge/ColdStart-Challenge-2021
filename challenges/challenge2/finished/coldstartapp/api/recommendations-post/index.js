const { getUser } = require('../shared/user-utils');
const data = require('../shared/recommendation-data');

module.exports = async function (context, req) {
  try {
    console.log(`Event id: ${req.body.eventId}, Reward score: ${req.body.rewardScore}`);
    await data.setReward(req.body.eventId, req.body.rewardScore);

    context.res.status(200);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
