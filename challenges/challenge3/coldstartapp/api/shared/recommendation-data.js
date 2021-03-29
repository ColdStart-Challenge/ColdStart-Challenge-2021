const { sqlConfig, config } = require("./config");
const mssql = require('mssql');
const { detect } = require('detect-browser');
const uuidv1 = require('uuid/v1');
const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

// Get recommended product
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

// Get the Personalizer client object
function getPersonalizerClient() {
  console.log('Get Personalizer client');
  const credentials = new CognitiveServicesCredentials(config.personalizer_key);
  // Initialize Personalization client.
  const personalizerClient = new Personalizer.PersonalizerClient(credentials, config.personalizer_baseuri);

  return personalizerClient;
}

// Get the recommended item from Personalizer service
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

// Set the reward score for the recommended item
async function setReward(eventId, rewardScore) {
  const personalizerClient = getPersonalizerClient();

  const rewardRequest = {
    value: rewardScore
  }

  await personalizerClient.events.reward(eventId, rewardRequest);
  console.log('Setting reward for event ' + eventId);
}

// Get the current user context
function getContextFeaturesList(userId, request) {
  let browserName = "unknown";
  let loggedIn = false;
  let timeOfDay = 'morning';
  let requestDatetime = new Date();

  // Check if the request date & time are overridden
  if(request.query['requestDate']) {
    requestDatetime = new Date(request.query['requestDate']);
  }

  let currentTime = requestDatetime.getHours();  
  if (currentTime >= 5 && currentTime < 12) {
    timeOfDay = 'morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    timeOfDay = 'afternoon';
  } else if (currentTime >= 18 && currentTime <= 23) {
    timeOfDay = 'evening';
  } else {
    timeOfDay = 'night';
  }

  const browser = detect(request.headers['user-agent']);
  if (browser) {
    browserName = browser.name;
  }
  console.log('Browser detected: ' + browserName);

  if (userId != 'anonymous') {
    loggedIn = true;
  }

  return [
    {
      "time": timeOfDay
    },
    {
      "day": requestDatetime.getDay()
    },
    {
      "loggedIn": loggedIn
    },
    {
      "browser": browserName
    }
  ];
}

// Get the list of excluded items
function getExcludedActionsList() {
  return [
    "10"
  ];
}

// Get the list of items
function getActionsList() {
  return [
    {
      "id": "1",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 9
        }
      ]
    },
    {
      "id": "2",
      "features": [
        {
          "taste": "sour"
        },
        {
          "nutritionLevel": 4
        }
      ]
    },
    {
      "id": "3",
      "features": [
        {
          "taste": "sour"
        },
        {
          "nutritionLevel": 5
        }
      ]
    },
    {
      "id": "4",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 2
        }
      ]
    },
    {
      "id": "5",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 6
        }
      ]
    },
    {
      "id": "6",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 4
        }
      ]
    },
    {
      "id": "7",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 3
        }
      ]
    },
    {
      "id": "8",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 2
        }
      ]
    },
    {
      "id": "9",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 1
        }
      ]
    },
    {
      "id": "10",
      "features": [
        {
          "taste": "sweet"
        },
        {
          "nutritionLevel": 5
        }
      ]
    }
  ];
}

module.exports = { getRecommendations, setReward };
