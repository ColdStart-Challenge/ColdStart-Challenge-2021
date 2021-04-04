using System;

namespace ColdStart.Models.Queue
{
    public class OrderQueueItem
    {
        public Guid Id { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
        public int IcecreamId { get; set; }
        public string Status { get; set; }
        public int? DriverId { get; set; }
        public string FullAddress { get; set; }
        public string LastPosition { get; set; }
    }
}