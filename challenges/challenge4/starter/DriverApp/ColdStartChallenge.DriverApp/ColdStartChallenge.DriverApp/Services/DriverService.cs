using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ColdStartChallenge.DriverApp.Models;
using MonkeyCache.FileStore;
using Newtonsoft.Json;

namespace ColdStartChallenge.DriverApp.Services
{
    public class DriverService
    {
        public readonly HttpClient _client;

        public DriverService()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(Constants.BASE_URI);
        }

        public async Task<IEnumerable<Driver>> GetDrivers()
        {
            if (!Barrel.Current.IsExpired(CacheKeys.Drivers))
            {
                string json = Barrel.Current.Get<string>(CacheKeys.Drivers);
                var drivers = JsonConvert.DeserializeObject<List<Driver>>(json);
                return drivers ?? new List<Driver>();
            }

            try
            {
                var response = await _client.GetAsync("drivers");

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var drivers = JsonConvert.DeserializeObject<List<Driver>>(json);

                    if (drivers != null)
                        Barrel.Current.Add<string>(CacheKeys.Drivers, json, TimeSpan.FromDays(1));

                    return drivers;
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return new List<Driver>();
                }
            }
            catch (Exception ex)
            {
            }

            return new List<Driver>();
        }

        public async Task<Driver> GetDriver(int driverId)
        {
            var drivers = await GetDrivers();
            return drivers.FirstOrDefault(i => i.DriverId.Value == driverId);
        }
    }
}