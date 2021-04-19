using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json;

namespace ColdStartChallenge.DriverApp.Models
{
    //public class Order
    //{
    //    public int Id { get; set; }
    //    public string User { get; set; }
    //    public DateTime Date { get; set; }
    //    public int IcecreamId { get; set; }
    //    public OrderStatus Status { get; set; }
    //    public int? DriverId { get; set; }
    //    public string FullAddress { get; set; }
    //    public Location LastPosition { get; set; }
    //    public string Name { get; set; }
    //    public string ImageUrl { get; set; }
    //    public string Description { get; set; }
    //    public Location Location { get; set; } //Nick should be adding this to the API
    //}

    public partial class Order
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("date")]
        public DateTimeOffset Date { get; set; }

        [JsonProperty("icecream")]
        public Icecream Icecream { get; set; }

        [JsonProperty("status")]
        private string Status { get; set; }

        [JsonIgnore]
        public OrderStatus OrderStatus
        {
            get => Enum<OrderStatus>.Parse(Status);
            set => Status = value.ToString();
        }

        [JsonProperty("driver")]
        public Driver Driver { get; set; }

        [JsonProperty("fullAddress")]
        public string FullAddress { get; set; }

        [JsonProperty("deliveryPosition")]
        private string DeliveryPosition { get; set; }

        [JsonIgnore]
        public Location Location
        {
            get
            {
                string[] coordinates = DeliveryPosition?.Split(',');
                return coordinates.Any() ? new Location() { Latitude = double.Parse(coordinates[0]), Longitude = double.Parse(coordinates[1]) } : null;
            }
        }

        [JsonProperty("lastPosition")]
        private string LastPosition { get; set; }

        [JsonIgnore]
        public Location DriverLocation
        {
            get
            {
                string[] coordinates = LastPosition?.Split(',');
                return coordinates.Any() ? new Location() { Latitude = double.Parse(coordinates[0]), Longitude = double.Parse(coordinates[1]) } : null;
            }
            set
            {
                if (value != null)
                    LastPosition = string.Concat(value.Latitude.ToString(CultureInfo.InvariantCulture), ",", value.Longitude.ToString(CultureInfo.InvariantCulture));
                else
                    LastPosition = null;
            }
        }
    }

}
