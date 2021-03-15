const { config } = require('../shared/config');

const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

const serviceKey = config.personalizer_key;

// The endpoint specific to your personalization service instance; 
// e.g. https://<your-resource-name>.cognitiveservices.azure.com
const baseUri = config.personalizer_base;

const credentials = new CognitiveServicesCredentials(serviceKey);

// Initialize Personalization client.
const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);


module.exports = async function (context, req) {
  const eventId = req.body.EventId;
  const rewardRequest = {
    value: req.body.Reward
  }
  await personalizerClient.events.reward(eventId, rewardRequest);
  context.res.status = 204;
  context.done();
}