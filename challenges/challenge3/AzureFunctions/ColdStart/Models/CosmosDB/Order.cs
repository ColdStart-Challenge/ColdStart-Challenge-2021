using System;
using System.Collections.Generic;
using System.Text;

namespace ColdStart.Models.CosmosDB
{
    public class Order
    {
        public Guid id { get; set; }
        public string user { get; set; }
        public DateTime date { get; set; }
        public Icecream icecream { get; set; }
        public string status { get; set; }
        public Driver driver { get; set; }
        public string fullAddress { get; set; }
        public string deliveryPosition { get; set; }
        public string lastPosition { get; set; }
    }

    public class Icecream
    {
        public int icecreamId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
    }

    public class Driver
    {
        public int? driverId { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
    }
}