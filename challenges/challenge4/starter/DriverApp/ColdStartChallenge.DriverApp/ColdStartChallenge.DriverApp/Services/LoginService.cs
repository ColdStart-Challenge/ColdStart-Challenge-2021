using ColdStartChallenge.DriverApp.Models;
using System.Threading.Tasks;

namespace ColdStartChallenge.DriverApp.Services
{
    public class LoginService
    {
        public async Task<Driver> Login(string username, string password)
        {
            //Dummy implementation, due to no actual authentication on backend
            await Task.Delay(1000);

            if( username == "MADN")
            {
                return new Driver
                {
                    DriverId = 1,
                    Name = "Mike"
                };
            }
            return null;
        }
    }
}
