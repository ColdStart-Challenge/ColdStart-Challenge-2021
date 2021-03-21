const { v4: uuidv4 } = require('uuid');
const data = require('../shared/catalog-data');
const { config } = require('../shared/config');
const { getUser } = require('../shared/user-utils');

const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
//const readline = require('readline-sync');

const browserDetect = require('browser-detect');

// The key specific to your personalization service instance; e.g. "0123456789abcdef0123456789ABCDEF"
const serviceKey = config.azure_personalizer_key;

// The endpoint specific to your personalization service instance; 
// e.g. https://<your-resource-name>.cognitiveservices.azure.com
const baseUri = config.azure_personalizer_url;

function getContext(req) {
    const browserType = browserDetect(req.headers['user-agent']);
    
    let date = new Date();
    let dayOfWeek = date.getDay();
    let hours = date.getHours();
    let timeOfDay = "";

    if(hours > 5 && hours <= 12){
        timeOfDay = "Morning";
    } else if (hours > 12 && hours <= 18){
        timeOfDay = "Afternoon";
    } else if (hours > 18 && hours <= 23) {
        timeOfDay = "Evening";
    } else {
        timeOfDay  = "Night";
    }
    
    const loggedInStatus = getUser(req).userDetails == "John Doe" ? 0 : 1;

    console.log("Browser: " + browserType);
    console.log("Time: " + timeOfDay);
    console.log("Day: " + dayOfWeek);
    console.log("Logged in status: " + loggedInStatus);

    return [
        {
            "browserType": browserType
        },
        {
            "timeOfDay": timeOfDay
        }, 
        {
            "dayOfWeek": dayOfWeek
        }, 
        {
            "loggedInStatus": loggedInStatus
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

    try {
        const credentials = new CognitiveServicesCredentials(serviceKey);
        const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);

        let rankRequest = {}

        // Generate an ID to associate with the request.
        rankRequest.eventId = uuidv4();

        // Get context information from the user.
        rankRequest.contextFeatures = getContext(req);

        // Get the actions list to choose from personalization with their features.
        rankRequest.actions = await getActionsList();

        rankRequest.deferActivation = false;

        // Rank the actions
        const rankResponse = await personalizerClient.rank(rankRequest);

        console.log("\nPersonalization service thinks you would like to have:\n")
        console.log(rankResponse.rewardActionId);

        // These probability scores should start changing as rewards are being given
        console.log("\nPersonalization service ranked the actions with the probabilities as below:\n");
        for (let i = 0; i < rankResponse.ranking.length; i++) {
             console.log(JSON.stringify(rankResponse.ranking[i]) + "\n");
        }

        var recommendedResult = [
            {
                Id: parseInt(rankResponse.rewardActionId),
                EventId: rankRequest.eventId
            }
        ]

        context.res.status(200).send(recommendedResult);

    } 
    catch (error) {
        console.error(error);
        context.res.status(500).send(error);
    }
}