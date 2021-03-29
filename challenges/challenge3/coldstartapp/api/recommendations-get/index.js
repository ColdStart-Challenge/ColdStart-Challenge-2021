const { getUser } = require('../shared/user-utils');
const data = require('../shared/recommendation-data');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  try {
    const items = await data.getRecommendations(user.userDetails, req);

    const result = JSON.stringify(items);
    context.res.status(200).send(result);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
