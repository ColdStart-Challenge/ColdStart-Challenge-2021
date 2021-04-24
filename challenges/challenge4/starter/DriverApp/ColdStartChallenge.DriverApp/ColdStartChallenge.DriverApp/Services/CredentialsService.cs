using System.Threading.Tasks;
using Xamarin.Essentials;

namespace ColdStartChallenge.DriverApp.Services
{
    public class CredentialsService
    {
        private const string UsernameKey = "username";
        private const string PasswordKey = "password";

        public Task StoreCredentials(string username, string passwd)
        {
            return Task.WhenAll(
                SecureStorage.SetAsync(UsernameKey, username),
                SecureStorage.SetAsync(PasswordKey, passwd)
             );
        }

        public async Task<(string username, string password)> GetCredentials()
        {
            var usernameTask = SecureStorage.GetAsync(UsernameKey);
            var passwordTask = SecureStorage.GetAsync(PasswordKey);

            await Task.WhenAll(usernameTask, passwordTask);

            return (usernameTask.Result, passwordTask.Result);
        }

        public void Purge()
        {
            SecureStorage.Remove(UsernameKey);
            SecureStorage.Remove(PasswordKey);
        }
    }
}
