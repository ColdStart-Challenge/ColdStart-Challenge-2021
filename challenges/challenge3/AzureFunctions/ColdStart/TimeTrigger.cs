using ColdStart.Repositories.CosmosDB;
using ColdStart.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ColdStart
{
    public class TimeTrigger
    {
        private IOrderDocumentRepository _orderDocumentRepository;
        private IAzureMapsService _azureMapsService;

        public TimeTrigger(IOrderDocumentRepository orderDocumentRepository, IAzureMapsService azureMapsService)
        {
            _orderDocumentRepository = orderDocumentRepository;
            _azureMapsService = azureMapsService;
        }
        
        [FunctionName("TimeTrigger")]
        public async Task Run([TimerTrigger("5,25,45 * * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            var acceptedOrders = await _orderDocumentRepository.GetAcceptedOrders();
            foreach (var order in acceptedOrders)
            {
                order.status = "Ready";
                order.deliveryPosition = await _azureMapsService.GetAddressCoordinates(order.fullAddress);

                await _orderDocumentRepository.UpsertOrder(order);
            }

            log.LogInformation("Done");
        }
    }
}