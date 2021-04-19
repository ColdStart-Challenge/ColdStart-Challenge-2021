using ColdStartChallenge.DriverApp.Navigation;
using System.Threading.Tasks;
using Xamarin.CommunityToolkit.ObjectModel;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp.ViewModels
{

    public class ViewModelBase : BindableBase
    {
        private bool _hasAppeared;

        protected INavigation Navigation { get; }

        public IAsyncCommand AppearingCommand => new AsyncCommand(OnAppearing);

        public IAsyncCommand DisappearingCommand => new AsyncCommand(OnDisappearing);

        private bool _isBusy;

        public bool IsBusy
        {
            get => _isBusy;
            set
            {
                if (_isBusy == value) return;
                _isBusy = value;
                RaisePropertyChanged();
            }
        }

        public ViewModelBase(INavigation navigation)
        {
            Navigation = navigation;
        }

        private Task OnAppearing()
        {
            var t = OnNavigatedTo(_hasAppeared ? NavigationMode.Back : NavigationMode.New);
            _hasAppeared = true;
            return t;
        }

        private Task OnDisappearing()
        => OnNavigatedFrom();

        protected virtual Task OnNavigatedTo(NavigationMode mode)
        => Task.CompletedTask;

        protected virtual Task OnNavigatedFrom()
        => Task.CompletedTask;
    }
}
