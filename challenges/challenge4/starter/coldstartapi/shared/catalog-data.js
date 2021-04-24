const { config } = require("./config");
const { queryDatabase } = require("../shared/sql-utils");

/**
 * Get all catalog items
 * @returns collection of catalog items
 */
async function getCatalog() {
  console.log('using database ');
  return await queryDatabase(`SELECT * FROM dbo.Icecreams`)
}

/**
 * Get a catalog item by id
 * @param {integer} itemId 
 * @returns 
 */
async function getCatalogItemById(itemId) {
  console.log('using database ');
  return await queryDatabase(`SELECT * FROM dbo.Icecreams WHERE Id = ${itemId}`);
}

module.exports = { getCatalog, getCatalogItemById };
