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
using ColdStart.Repositories;
using ColdStart.Models.Queue;
using ColdStart.Models.CosmosDB;

namespace ColdStart
{
    public class QueueTrigger
    {
        private ICatalogRepository _catalogRepository;
        
        public QueueTrigger(ICatalogRepository catalogRepository)
        {
            _catalogRepository = catalogRepository;
        }
        
        [FunctionName("QueueTrigger")]
        public async Task Run([QueueTrigger("customer-orders", Connection = "QueueStorage")]string myQueueItem,
            //[CosmosDB(databaseName: "thezoocoldstart", collectionName: "coldstart", ConnectionStringSetting = "EndpointUri", PartitionKey = "PrimaryKey", CreateIfNotExists = false)] string result,
            ILogger log)
        {
            var queuedOrder = JsonConvert.DeserializeObject<OrderQueueItem>(myQueueItem);
            log.LogInformation(myQueueItem);

            var iceCream = await _catalogRepository.GetIcecream(queuedOrder.IcecreamId);

            var document = new Order
            {
                id = queuedOrder.Id,
                user = queuedOrder.User,
                date = queuedOrder.Date,
                icecream = iceCream,
                status = "Accepted",
                driver = new Driver { driverId = queuedOrder.DriverId, name = null, imageUrl = null },
                fullAddress = queuedOrder.FullAddress,
                deliveryPosition = null,
                lastPosition = null
            };

            var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("EndpointUri"), Environment.GetEnvironmentVariable("PrimaryKey"));
            var db = cosmosClient.GetDatabase("thezoocoldstart");
            var container = db.GetContainer("coldstart");
            await container.CreateItemAsync<Order>(document, new PartitionKey(document.id.ToString()));

            log.LogInformation("Done");
            //log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
        }
    }
}