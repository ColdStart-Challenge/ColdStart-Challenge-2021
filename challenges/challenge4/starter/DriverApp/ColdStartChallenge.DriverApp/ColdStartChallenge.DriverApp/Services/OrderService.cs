using ColdStartChallenge.DriverApp.Models;
using MonkeyCache.FileStore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ColdStartChallenge.DriverApp.Services
{
    public class OrderService
    {
        private readonly HttpClient _client;
        private readonly LocationService _locationService;

        public OrderService()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(Constants.BASE_URI);
            _locationService = new LocationService();
        }

        public async Task<List<Order>> GetOrders(SortOption sorting, OrderStatus orderStatus = OrderStatus.Ready)
        {
            var orders = await GetOrders(orderStatus);

            if (orders == null)
                return null;
            else
            {
                Func<Order, object> sortFunction = (o) => o.Date;

                if (sorting == SortOption.Distance)
                {
                    var location = await _locationService.GetLocation();
                    if (location != null)
                    {
                        sortFunction = (o) => Xamarin.Essentials.Location.CalculateDistance(
                            new Xamarin.Essentials.Location(o.Location?.Latitude ?? 0, o.Location?.Longitude ?? 0)
                            , location, Xamarin.Essentials.DistanceUnits.Kilometers);
                    }
                }

                return orders
                    .OrderBy(o => o.OrderStatus == OrderStatus.Delivering ? 0 : 1) //Default sorting, items delivering should always be on top
                    .ThenBy(sortFunction).ToList();
            }
        }

        public async Task<Order> GetOrder(Guid id, OrderStatus orderStatus = OrderStatus.Ready)
        {
            if (Barrel.Current.Exists(key: $"Orders{orderStatus.ToString()}"))
            {
                string json = Barrel.Current.Get<string>($"Orders{orderStatus.ToString()}");
                var orders = JsonConvert.DeserializeObject<List<Order>>(json);
                return orders.FirstOrDefault(i => i.Id == id);
            }

            return null;
        }

        public async Task UpdateOrder(Order order)
        {
            var orderAsJson = JsonConvert.SerializeObject(order);
            var content = new StringContent(orderAsJson, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync($"orders/{order.Id}", content);
        }

        private async Task<IEnumerable<Order>> GetOrders(OrderStatus orderStatus = OrderStatus.Ready)
        {
            try
            {
                var response = await _client.GetAsync($"orders?status={orderStatus.ToString()}");

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var orders = JsonConvert.DeserializeObject<List<Order>>(json);

                    if (orders != null)
                        Barrel.Current.Add<string>($"Orders{orderStatus.ToString()}", json, TimeSpan.FromMinutes(15));

                    return orders;
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return new List<Order>();
                }
            }
            catch (Exception ex)
            {
            }

            if (Barrel.Current.Exists(key: $"Orders{orderStatus.ToString()}"))
            {
                string json = Barrel.Current.Get<string>($"Orders{orderStatus.ToString()}");
                var orders = JsonConvert.DeserializeObject<List<Order>>(json);
                return orders ?? new List<Order>();
            }

            return new List<Order>();
        }
    }
}
