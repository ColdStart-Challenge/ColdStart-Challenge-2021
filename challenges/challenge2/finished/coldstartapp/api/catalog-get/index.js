const data = require('../shared/catalog-data');

module.exports = async function (context, req) {
  try {
    const items = await data.getCatalog();
    const result = JSON.stringify(items);
    context.res.status(200).send(result);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
