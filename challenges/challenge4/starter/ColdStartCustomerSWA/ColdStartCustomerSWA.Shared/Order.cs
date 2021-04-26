using System;

namespace ColdStartCustomerSWA
{
    public class Order
    {
        public Guid Id { get; set; }

        public string User { get; set; }

        public DateTime Date { get; set; }

        public IceCream IceCream { get; set; }

        public string Status { get; set; }

        public Driver Driver { get; set; }

        public string FullAddress { get; set; }

        public string DeliveryPosition { get; set; }

        public string LastPosition { get; set; }
    }
}
