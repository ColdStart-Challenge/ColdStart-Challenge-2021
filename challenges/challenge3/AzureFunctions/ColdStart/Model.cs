using System;
using System.Collections.Generic;
using System.Text;

namespace ColdStart
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Icecream
    {
        public int icecreamId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
    }

    public class Driver
    {
        public object driverId { get; set; }
        public object name { get; set; }
        public object imageUrl { get; set; }
    }

    public class Root
    {
        public string id { get; set; }
        public string user { get; set; }
        public DateTime date { get; set; }
        public Icecream icecream { get; set; }
        public string status { get; set; }
        public Driver driver { get; set; }
        public string fullAddress { get; set; }
        public object deliveryPosition { get; set; }
        public object lastPosition { get; set; }
    }
}
