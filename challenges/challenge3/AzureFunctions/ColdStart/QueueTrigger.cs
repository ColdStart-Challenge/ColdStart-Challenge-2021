using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;

namespace ColdStart
{
    public static class QueueTrigger
    {       
        [FunctionName("QueueTrigger")]
        public static async void Run([QueueTrigger("customer-orders", Connection = "QueueStorage")]string myQueueItem, ILogger log)
        {
            var myDeserializedClass = JsonConvert.DeserializeObject<Root>(myQueueItem);
            log.LogInformation(myQueueItem);

            var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("EndpointUri"), Environment.GetEnvironmentVariable("PrimaryKey"));

            var db = cosmosClient.GetDatabase("thezoocoldstart");
            var container = db.GetContainer("coldstart");

            var response = await container.CreateItemAsync<Root>(myDeserializedClass, new PartitionKey(myDeserializedClass.id));
            log.LogInformation("Done");
            //log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
        }
    }
}
