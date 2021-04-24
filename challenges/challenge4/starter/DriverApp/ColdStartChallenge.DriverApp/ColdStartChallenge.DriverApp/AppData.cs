using ColdStartChallenge.DriverApp.Models;

namespace ColdStartChallenge.DriverApp
{
    public sealed class AppData
    {
        static AppData()
        {
        }

        private AppData()
        {
        }

        public static AppData Instance { get; } = new AppData();

        public Driver User { get; set; }
    }
}
