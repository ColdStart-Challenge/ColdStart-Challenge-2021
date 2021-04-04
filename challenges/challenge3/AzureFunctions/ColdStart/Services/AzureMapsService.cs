using AzureMapsToolkit;
using AzureMapsToolkit.Search;
using Microsoft.Azure.Cosmos.Spatial;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ColdStart.Services
{
    public interface IAzureMapsService
    {
        Task<Point> GetAddressCoordinates(string address);
    }
    
    public class AzureMapsService : IAzureMapsService
    {
        public async Task<Point> GetAddressCoordinates(string address)
        {
            var mapsKey = Environment.GetEnvironmentVariable("AZURE_MAPS_KEY");
            var amSvc = new AzureMapsServices(mapsKey);
            var request = new SearchAddressRequest { Query = address, Limit = 10 };
            var response = await amSvc.GetSearchAddress(request);

            if (response.Error != null)
                throw new Exception(response.Error.Error.Message);

            if (response.Result.Results?.Length > 0)
            {
                var bestResult = response.Result.Results
                    .OrderByDescending(r => r.Score)
                    .First();
                
                return new Point(bestResult.Position.Lon, bestResult.Position.Lat);
            }
            else
                return null;
        }
    }
}