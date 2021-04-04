using System;
using System.Collections.Generic;
using System.Configuration;
using ColdStart.Models.CosmosDB;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace ColdStart
{
    public static class TimeTrigger
    {
        [FunctionName("TimeTrigger")]
        public static async void Run([TimerTrigger("5,25,45 * * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("EndpointUri"), Environment.GetEnvironmentVariable("PrimaryKey"));

            var db = cosmosClient.GetDatabase("thezoocoldstart");
            var container = db.GetContainer("coldstart");

            var sqlQueryText = "SELECT * FROM c WHERE c.status = 'Accepted'";

            Console.WriteLine("Running query: {0}\n", sqlQueryText);

            var queryDefinition = new QueryDefinition(sqlQueryText);
            var queryResultSetIterator = container.GetItemQueryIterator<Order>(queryDefinition);

            var orders = new List<Order>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<Order> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (Order order in currentResultSet)
                {
                    orders.Add(order);
                    Console.WriteLine("\tRead {0}\n", order);
                }
            }

            foreach (var order in orders)
            {
                order.status = "Ready";

                var response = container.UpsertItemAsync<Order>(order, new PartitionKey(order.id.ToString()));
            }

            log.LogInformation("Done");

        }
    }
}
