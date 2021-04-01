using System;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace ColdStart
{
    public static class TimeTrigger
    {
        [FunctionName("TimeTrigger")]
        public static async void Run([TimerTrigger("5,25,45 * * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("EndpointUri"), Environment.GetEnvironmentVariable("PrimaryKey"));

            var db = cosmosClient.GetDatabase("thezoocoldstart");
            var container = db.GetContainer("coldstart");

            var sqlQueryText = "SELECT * FROM c WHERE c.status = 'Accepted'";

            Console.WriteLine("Running query: {0}\n", sqlQueryText);

            var queryDefinition = new QueryDefinition(sqlQueryText);
            var queryResultSetIterator = container.GetItemQueryIterator<Root>(queryDefinition);

            var orders = new List<Root>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<Root> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (Root root in currentResultSet)
                {
                    orders.Add(root);
                    Console.WriteLine("\tRead {0}\n", root);
                }
            }

            foreach(var order in orders)
            {
                order.status = "Ready";

                var response = container.UpsertItemAsync<Root>(order, new PartitionKey(order.id));
            }

            log.LogInformation("Done");

        }
    }
}
