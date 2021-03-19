const fs = require('fs').promises;

async function getCatalog() {
  console.log('using static data.');
  var stringData = await fs.readFile('./shared/catalog.json', 'utf8');
  const data = JSON.parse(stringData);
  return data.icecreams;
}

module.exports = { getCatalog };
