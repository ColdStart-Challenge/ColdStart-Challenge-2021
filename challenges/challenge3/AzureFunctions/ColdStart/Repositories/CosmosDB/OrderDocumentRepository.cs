using ColdStart.Models.CosmosDB;
using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ColdStart.Repositories.CosmosDB
{
    public interface IOrderDocumentRepository
    {
        Task<Order> AcceptOrder(Order order);
        Task<Order> UpsertOrder(Order order);
        Task<List<Order>> GetAcceptedOrders();
    }

    public class OrderDocumentRepository : IOrderDocumentRepository
    {
        public async Task<Order> AcceptOrder(Order order)
        {
            return await GetContainer().CreateItemAsync<Order>(order, new PartitionKey(order.id.ToString()));
        }

        public async Task<Order> UpsertOrder(Order order)
        {
            return await GetContainer().UpsertItemAsync<Order>(order, new PartitionKey(order.id.ToString()));
        }

        public async Task<List<Order>> GetAcceptedOrders()
        {
            var sqlQueryText = "SELECT * FROM c WHERE c.status = 'Accepted'";
            var queryDefinition = new QueryDefinition(sqlQueryText);
            var queryResultSetIterator = GetContainer().GetItemQueryIterator<Order>(queryDefinition);

            var orders = new List<Order>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<Order> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (Order order in currentResultSet)
                {
                    orders.Add(order);
                }
            }

            return orders;
        }

        private Container GetContainer()
        {
            var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("EndpointUri"), Environment.GetEnvironmentVariable("PrimaryKey"));
            var db = cosmosClient.GetDatabase("thezoocoldstart");
            return db.GetContainer("coldstart");
        }
    }
}