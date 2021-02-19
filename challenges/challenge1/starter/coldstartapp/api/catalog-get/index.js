const { getUser } = require('../shared/user-utils');
const data = require('../shared/catalog-data');

module.exports = async function (context, req) {
  try {
    const user = getUser(req);
    const items = await data.getCatalog(user.userDetails);

    context.res.status(200).send(items);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
