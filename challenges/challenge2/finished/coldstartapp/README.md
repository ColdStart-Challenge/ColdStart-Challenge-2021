# ColdStart Web Application - Challenge 2 Solution

## Introduction

This is a possible solution for the second coding challenge. The objectives were the following:

1. Create an Azure SQL Database and connect the web application to it to retrieve the catalog items and store customer pre-orders.
2. Import existing pre-orders from a CSV file into the database using Azure Data Factory.
3. Use Azure Personalizer to show 1 recommended ice cream to the user in the web application.

## Solution

### Using Azure SQL Database for the web application

In the first challenge we used static data coming from JSON files to populate the catalog of ice creams, and customer orders were only stored in the queue. In this challenge, we'll use [Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview?ocid=aid3027557) as the data store for our web application. Azure SQL Database is a fully managed platform as a service (PaaS) database engine that handles most of the database management functions such as upgrading, patching, backups, and monitoring without user involvement. 

We'll start by **creating a new database in the Azure management portal**. Follow [this quickstart](https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal&ocid=aid3027557) to achieve this.

![Create Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/media/single-database-create-quickstart/new-sql-database-basics.png)

Next, we'll **create the database tables** using the provided SQL scripts. You can use the [Query Editor](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-portal?ocid=aid3027557) in the Azure portal to run SQL scripts against your database. Accordingly, you can now **populate the Icecreams and Drivers tables**.

```sql
INSERT INTO [dbo].[Icecreams] 
([Id], [Name], [Description], [ImageUrl]) 
VALUES
(1, 'Color Pop', 'Delicious 4-color popsicle, plenty of vitamins.', 'https://coldstartsa.blob.core.windows.net/web/assets/Icecream1.png')
```

Now that we have the database ready and populated, we'll **connect the application to the database**. In our solution, we're using the `mssql` npm package to connect to the database. Below the code for retrieving the list of ice creams:

```javascript
const { sqlConfig } = require("./config");
const mssql = require('mssql');

async function getCatalog() {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT * FROM dbo.Icecreams ORDER BY [Id]`);

  return result.recordset;
}

module.exports = { getCatalog };
```

To connect to the database, we need the connection parameters. We have put those in a separate configuration file `config.js`. The parameters are retrieved from environment variables, which can then be overridden in the Azure Static Web App configuration settings in the Azure portal.

```javascript
const sqlConfig = {
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVERNAME,
  database: 'coldstartsql',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};
```

### Import historical data using Azure Data Factory

The second objective of this coding challenge was to import historical data into the database. We can use [Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/introduction?ocid=aid3027557) to automate this process. Azure Data Factory is a managed cloud service that's built for complex hybrid extract-transform-load (ETL), extract-load-transform (ELT), and data integration projects.

The first step is to **create an Azure Data Factory resource** in the Azure Management portal. You can use the steps provided in [this quickstart](https://docs.microsoft.com/en-us/azure/data-factory/quickstart-create-data-factory-portal?ocid=aid3027557) to do so.

Next, we will **upload the historical data CSV file to Azure Blob Storage**. Follow the steps in [this quickstart](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal?ocid=aid3027557) to create a Storage account and upload the file.

Finally, we will **define the data import process** in the Azure Data Factory portal. We have a [tutorial](https://docs.microsoft.com/en-us/azure/data-factory/tutorial-copy-data-portal?ocid=aid3027557) describing how to ingest data from Azure Blob Storage into an Azure SQL Database. Once the pipeline is defined, you can now trigger it manually to execute the data ingestion.

![Trigger Azure Data Factory pipeline manually](https://docs.microsoft.com/en-us/azure/data-factory/media/tutorial-copy-data-portal/monitor-pipeline-inline-and-expended.png)


### Adding product recommendations with Personalizer

The final objective of this challenge is to add product recommendations to the web application. We want to suggest a recommended ice cream to the website users, based on their profile and adjust those recommendations based on their behavior. If a user orders the recommended product, we'll value that recommendation higher than if the user would choose another product. This concept is referred to as **reinforcement learning** within the domain of machine learning. Using the [Azure Personalizer](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/what-is-personalizer?ocid=aid3027557) service you can add this functionality to your applications without having to know the specifics of implementing reinforcement learning algorithms yourself.

As a first step, we'll need to **[create an Azure Personalizer resource](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesPersonalizer)** in the Azure portal. Once created, you'll need the endpoint url and the access key to your Personalizer instance. These are then specified in the `config.js` file.

```javascript
const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.PERSONALIZER_KEY,
  personalizer_baseuri: process.env.PERSONALIZER_BASEURI,
};
```

To retrieve a product recommendation (also known as *ranking*), we need to provide the Personalizer with some context:

- user context (browser, logged in status, time of day, day of the week)
- list of products, with their features
- list of products to exclude for recommendations

Using this context, we can then request a ranking from the Personalizer service. We also need to specify a unique id (`eventId`) to allow for correlating the user's response (was the recommended product bought or not) with the ranking.

```javascript
async function generateRank(userId, request) {
  console.log('Generate Rank');
  const personalizerClient = getPersonalizerClient();

  // Generate a random event id (guid)
  let rankRequest = {}
  rankRequest.eventId = uuidv1();

  // Get context information from the user (browser, time of day, day of week, etc.).
  rankRequest.contextFeatures = getContextFeaturesList(userId, request);

  // Get the actions list to choose from personalization with their features.
  rankRequest.actions = getActionsList();

  // Exclude an action for personalization ranking.
  rankRequest.excludedActions = getExcludedActionsList();

  rankRequest.deferActivation = false;

  // Rank the actions
  const rankResponse = await personalizerClient.rank(rankRequest);

  return rankResponse;
}
```

To get the product recommendation in the web application, we then add an API (`recommendations-get`) that will invoke this `generateRank` function. Notice that we are returning the `eventId` as part of the API response to allow us to correlate it when a product is ordered.

```javascript
async function getRecommendations(userId, request) {
  // Call Personalizer to get recommended ice cream id, using the current user context
  let rankResponse = await generateRank(userId, request)

  // Retrieve the recommended ice cream using rankResponse
  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .input('icecreamId', mssql.Int, rankResponse.rewardActionId)
    .query(`SELECT *, '${rankResponse.eventId}' as EventId FROM dbo.Icecreams WHERE Id = @icecreamId`);

  return result.recordset;
}
```

To provide the feedback from the user, we will update the `orders-post` API to verify if the `eventId` field is available in the request. If this is the case, we know that the user has chosen the product recommendation and we can reward that recommendation.

```javascript
async function setReward(eventId, rewardScore) {
  const personalizerClient = getPersonalizerClient();

  const rewardRequest = {
    value: rewardScore
  }

  await personalizerClient.events.reward(eventId, rewardRequest);
  console.log('Setting reward for event ' + eventId);
}
```


## Running the solution locally

### Frontend

The frontend application is developed using Vue.js. It will communicate directly with the backend APIs included in the starter application.

You can run the web frontend locally by executing the following commands:

```cmd
cd vue-app
npm install
npm run serve
```

### Backend APIs

The backend APIs are hosted using Azure Functions and can be run locally using the Azure Functions Core Tools.

> Make sure to rename `local.setting.json` to `local.settings.json`. The settings file is excluded to not expose any local secrets in the GitHub repository.

As we're now connecting to external services, namely the Azure SQL Database and Personalizer service, we need to specify their connection parameters through environment variables. In a PowerShell this would be configured as follows:

```powershell
$env:SQL_PASSWORD = '{your sql password}'
$env:SQL_SERVERNAME = '{your sql server}.database.windows.net'
$env:SQL_USERNAME = '{your sql user name}'
$env:PERSONALIZER_BASEURI = 'https://{your personalizer resource name}.cognitiveservices.azure.com'
$env:PERSONALIZER_KEY = '{your personalizer key}'
```

You can now run the APIs locally by executing the following commands:

```cmd
cd api
npm install
npm start
```
