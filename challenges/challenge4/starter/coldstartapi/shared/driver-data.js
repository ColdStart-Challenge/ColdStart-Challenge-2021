const { config } = require("./config");
const { queryDatabase } = require("../shared/sql-utils");

const storageBaseUrl = "https://coldstartsa.blob.core.windows.net/web/assets/";

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

async function getDrivers() {
  if (config.no_database) {
    console.log('using static data');
    return data.drivers;
  } else {
    console.log('using database ');
    return await queryDatabase(`SELECT [Id] as driverId, [Name] as name, [ImageUrl] as imageUrl FROM dbo.Drivers`)
  };
}

async function getDriverById(driverId) {
  if (config.no_database) {
    console.log('using static data');
    return data.drivers;
  } else {
    console.log('using database ');
    return await queryDatabase(`SELECT [Id] as driverId, [Name] as name, [ImageUrl] as imageUrl FROM dbo.Drivers WHERE Id = ${driverId}`);
  };
}

module.exports = { getDrivers, getDriverById };
