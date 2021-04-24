const { config } = require("./config");
const { queryDatabase } = require("../shared/sql-utils");

const storageBaseUrl = "https://coldstartsa.blob.core.windows.net/web/assets/";

// Schema for drivers
const data = {
  drivers: [
    {
      driverId: 1,
      name: 'Daisy Driver',
      imageUrl: storageBaseUrl + 'Driver1.png'
    },
    {
      driverId: 2,
      name: 'Donny Driver',
      imageUrl: storageBaseUrl + 'Driver1.png'
    },
  ],
};

/**
 * Get a driver by it's id
 * @param {integer} driverId 
 * @returns 
 */
async function getDriverById(driverId) {
  console.log('using database ');
  return await queryDatabase(`SELECT [Id] as driverId, [Name] as name, [ImageUrl] as imageUrl FROM dbo.Drivers WHERE Id = ${driverId}`);
}

module.exports = { getDriverById };
