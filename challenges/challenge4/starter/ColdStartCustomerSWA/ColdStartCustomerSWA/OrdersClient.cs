using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace ColdStartCustomerSWA
{
    public class OrdersClient
    {
        private readonly IConfiguration configuration;
        private readonly HttpClient httpClient;

        public OrdersClient(
            IConfiguration configuration,
            HttpClient httpClient)
        {
            this.configuration = configuration;
            this.httpClient = httpClient;
        }

        public async Task<IEnumerable<Order>> GetOrders(string username)
        {
            HttpRequestMessage newRequest = new HttpRequestMessage(HttpMethod.Get, configuration["ColdStartApiUrl"] + "my-orders");
            HttpResponseMessage response = await httpClient.SendAsync(newRequest);

            List<Order> orders = JsonConvert.DeserializeObject<List<Order>>(await response.Content.ReadAsStringAsync());

            return orders
                .Where(o => o.User == username)
                .OrderByDescending(o => o.Date).ToList();
        }


        public async Task<Order> GetOrder(Guid orderId)
        {
            // TODO: get order by orderId
            return new Order();
        }
    }
}
