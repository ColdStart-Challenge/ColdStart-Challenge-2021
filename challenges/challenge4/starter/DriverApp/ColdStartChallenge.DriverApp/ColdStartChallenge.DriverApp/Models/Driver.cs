using System;
using Newtonsoft.Json;

namespace ColdStartChallenge.DriverApp.Models
{
    //public class Driver
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}

    public class Driver
    {
        [JsonProperty("driverId")]
        public int? DriverId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("imageUrl")]
        public Uri ImageUrl { get; set; }
    }
}