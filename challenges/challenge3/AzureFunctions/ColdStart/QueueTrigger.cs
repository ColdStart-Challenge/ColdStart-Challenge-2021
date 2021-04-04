using ColdStart.Models.CosmosDB;
using ColdStart.Models.Queue;
using ColdStart.Repositories.CosmosDB;
using ColdStart.Repositories.SQL;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ColdStart
{
    public class QueueTrigger
    {
        private ICatalogRepository _catalogRepository;
        private IOrderDocumentRepository _orderDocumentRepository;

        public QueueTrigger(ICatalogRepository catalogRepository, IOrderDocumentRepository orderDocumentRepository)
        {
            _catalogRepository = catalogRepository;
            _orderDocumentRepository = orderDocumentRepository;
        }
        
        [FunctionName("QueueTrigger")]
        public async Task Run([QueueTrigger("customer-orders", Connection = "QueueStorage")]string myQueueItem, ILogger log)
        {
            var queuedOrder = JsonConvert.DeserializeObject<OrderQueueItem>(myQueueItem);
            log.LogInformation(myQueueItem);

            var iceCream = await _catalogRepository.GetIcecream(queuedOrder.IcecreamId);

            var document = new Order
            {
                id = queuedOrder.Id,
                user = queuedOrder.User,
                date = queuedOrder.Date,
                icecream = iceCream,
                status = "Accepted",
                driver = new Driver { driverId = queuedOrder.DriverId, name = null, imageUrl = null },
                fullAddress = queuedOrder.FullAddress,
                deliveryPosition = null,
                lastPosition = null
            };

            await _orderDocumentRepository.AcceptOrder(document);

            log.LogInformation("Done");
        }
    }
}