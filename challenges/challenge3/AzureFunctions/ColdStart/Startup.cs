using ColdStart.Repositories.CosmosDB;
using ColdStart.Repositories.SQL;
using ColdStart.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(ColdStart.Startup))]

namespace ColdStart
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<ICatalogRepository, CatalogRepository>();
            builder.Services.AddTransient<IOrderDocumentRepository, OrderDocumentRepository>();
            builder.Services.AddTransient<IAzureMapsService, AzureMapsService>();
        }
    }
}