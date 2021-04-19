using ColdStartChallenge.DriverApp.Pages;
using MonkeyCache.FileStore;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            Barrel.ApplicationId = "ColdStartChallenge.DriverApp";

            MainPage = new NavigationPage(new LoginPage());
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
