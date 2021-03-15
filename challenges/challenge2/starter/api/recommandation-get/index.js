const { getAuthenticationStatus } = require('../shared/user-utils');
const data = require('../shared/catalog-data');

const { config } = require('../shared/config');

const { v1: uuidv1 } = require('uuid');
const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

const serviceKey = config.personalizer_key;

// The endpoint specific to your personalization service instance; 
// e.g. https://<your-resource-name>.cognitiveservices.azure.com
const baseUri = config.personalizer_base;

const credentials = new CognitiveServicesCredentials(serviceKey);

// Initialize Personalization client.
const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);

function getContextFeaturesList(req) {

  const dayOfWeekFeatures = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  const timeOfDayFeatures = ['morning', 'afternoon', 'evening', 'night'];

  let authenticationStatus = getAuthenticationStatus(req);

  const browser = require('browser-detect');

  let date = new Date();
  let dow = date.getDay();
  let tod = date.getHours();
  let t = timeOfDayFeatures[0];

  if (tod > 6 && tod <= 12) {
    t = timeOfDayFeatures[0];
  } else if (tod > 12 && tod <= 18) {
    t = timeOfDayFeatures[1];
  } else if (tod > 18 && tod <= 22) {
    t = timeOfDayFeatures[2];
  } else {
    t = timeOfDayFeatures[3];
  }

  const b = browser(req.headers['user-agent']);

  return [
    {
      "time": t
    },
    {
      "day": dayOfWeekFeatures[dow]
    },
    {
      "browser": b.name
    },
    {
      "status": authenticationStatus
    }
  ];
}

async function getActionsList() {
  const items = await data.getCatalog();
  const result = [];

  items.forEach(function (item) {
    result.push({
      id: item.Id.toString(),
      features: [
        {
          Name: item.Name,
          Description: item.Description,
          ImageUrl: item.ImageUrl
        }
      ]
    })
  });
  return result;
}

module.exports = async function (context, req) {

  const rankRequest = {}

  // Generate an ID to associate with the request.
  rankRequest.eventId = uuidv1();

  // Get context information from the user.
  rankRequest.contextFeatures = getContextFeaturesList(req);

  // Get the actions list to choose from personalization with their features.
  rankRequest.actions = await getActionsList();

  // Exclude an action for personalization ranking. This action will be held at its current position.
  //rankRequest.excludedActions = getExcludedActionsList();

  rankRequest.deferActivation = false;

  console.log(rankRequest);

  // Rank the actions
  const rankResponse = await personalizerClient.rank(rankRequest);

  context.res.status(200).send(rankResponse);
}