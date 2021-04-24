using Acr.UserDialogs;
using ColdStartChallenge.DriverApp.Navigation;
using ColdStartChallenge.DriverApp.Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using ColdStartChallenge.DriverApp.Pages;
using Xamarin.CommunityToolkit.ObjectModel;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp.ViewModels
{
    public class LoginPageViewModel : ViewModelBase
    {
        private readonly LoginService _loginService;        
        private readonly CredentialsService _credentialsService;
        private readonly DriverService _driverService;

        public IAsyncCommand LoginCommand => new AsyncCommand(OnLogin);

        private string _userName;
        public string UserName
        {
            get => _userName;
            set
            {
                if (_userName != value)
                {
                    _userName = value;
                    RaisePropertyChanged();
                    RaisePropertyChanged(nameof(CanLogin));
                }
            }
        }

        private string _password;
        public string Password
        {
            get => _password;
            set
            {
                if (_password != value)
                {
                    _password = value;
                    RaisePropertyChanged();
                    RaisePropertyChanged(nameof(CanLogin));
                }
            }
        }

        public bool CanLogin
            => !string.IsNullOrWhiteSpace(UserName) && !string.IsNullOrWhiteSpace(Password);

        private bool _rememberMe;
        public bool RememberMe 
        {
            get => _rememberMe;
            set
            {
                if(_rememberMe != value)
                {
                    _rememberMe = value;
                    RaisePropertyChanged();
                }
            }
        }

        public LoginPageViewModel(INavigation navigation)
            : base(navigation)
        {
            _loginService = new LoginService();
            _credentialsService = new CredentialsService();
            _driverService = new DriverService();
        }

        protected override Task OnNavigatedTo(NavigationMode mode)
        {
            return TryPrefillCredentials();
        }

        protected override Task OnNavigatedFrom()
        {
            //Login page should be removed from navigation stack to avoid navigating back to it
            if (Navigation.NavigationStack.Last().BindingContext != this)
                Navigation.RemovePage(Navigation.NavigationStack.First(p => p.BindingContext == this));

            return base.OnNavigatedFrom();
        }

        private async Task TryPrefillCredentials()
        {
            IsBusy = true;

            var (username, password) = await _credentialsService.GetCredentials();

            IsBusy = false;

            if(username != null && password != null)
            {
                UserName = username;
                Password = password;
                RememberMe = true;
            }
        }

        private async Task OnLogin()
        {
            try
            {
                IsBusy = true;

                //Force getting all drivers from the backend to cache in the app
                var drivers = await _driverService.GetDrivers();
                var driver = await _loginService.Login(UserName, Password);
                driver = await _driverService.GetDriver(driver.DriverId.Value);

                if (driver != null)
                {
                    if (RememberMe)
                        await _credentialsService.StoreCredentials(UserName, Password);
                    else
                        _credentialsService.Purge();

                    AppData.Instance.User = driver;

                    await LaunchApp();
                }
                else
                {
                    UserDialogs.Instance.Alert("Invalid credentials", "unable to login");
                    _credentialsService.Purge();
                    Password = null;
                }
            }
            catch (Exception ex)
            {
                UserDialogs.Instance.Alert("Something went wrong...\r\nTry again later!", "unable to login");
            }
            finally
            {
                IsBusy = false;
            }
        }

        private Task LaunchApp()
            => Navigation.PushAsync(new DashboardPage());
    }
}
