using ColdStart.Repositories.CosmosDB;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ColdStart
{
    public class TimeTrigger
    {
        private IOrderDocumentRepository _orderDocumentRepository;

        public TimeTrigger(IOrderDocumentRepository orderDocumentRepository)
        {
            _orderDocumentRepository = orderDocumentRepository;
        }
        
        [FunctionName("TimeTrigger")]
        public async Task Run([TimerTrigger("5,25,45 * * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            var acceptedOrders = await _orderDocumentRepository.GetAcceptedOrders();
            foreach (var order in acceptedOrders)
            {
                order.status = "Ready";
                await _orderDocumentRepository.UpsertOrder(order);
            }

            log.LogInformation("Done");
        }
    }
}