using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace ColdStartChallenge.DriverApp.Services
{
    public class LocationService
    {
        private CancellationTokenSource _cts;

        public async Task<Location> GetLocation()
        {
            try
            {
                // *** GET THE CURRENT LOCATION ***
            }
            catch (Exception ex)
            {
            }
            finally
            {
                if (_cts != null)
                {
                    _cts.Dispose();
                    _cts = null;
                }
            }
            return null;
        }

        public async Task<(Location currentLocation, Placemark place)?> GetLocationDetail()
        {
            try
            {
                // *** GECODE THE CURRENT LOCATION **
            }
            catch (Exception ex)
            {               
            }
            finally
            {
                if (_cts != null)
                {
                    _cts.Dispose();
                    _cts = null;
                }
            }
            return null;
        }
    }
}
