using System;
using System.Linq;
using System.Threading.Tasks;
using Acr.UserDialogs;
using ColdStartChallenge.DriverApp.Models;
using ColdStartChallenge.DriverApp.Navigation;
using ColdStartChallenge.DriverApp.Services;
using Xamarin.CommunityToolkit.ObjectModel;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp.ViewModels
{
    public class DeliveryDetailPageViewModel : ViewModelBase
    {
        private readonly OrderService _orderService;
        private readonly DriverService _driverService;

        private Guid _orderId;
        private OrderStatus _orderStatus;

        // *** ADD THE NEEDED PROPERTIES AND COMMAND FOR MVVM BINDING ***

        public DeliveryDetailPageViewModel(INavigation navgiation, Guid orderId, OrderStatus orderStatus)
            : base(navgiation)
        {
            _orderService = new OrderService();
            _driverService = new DriverService();
            _orderId = orderId;
            _orderStatus = orderStatus;
        }

        protected override async Task OnNavigatedTo(NavigationMode mode)
        {
            if (mode == NavigationMode.New)
            {
                IsBusy = true;

                await LoadOrder(_orderId, _orderStatus);

                IsBusy = false;
            }
        }

        private async Task LoadOrder(Guid orderId, OrderStatus orderStatus)
        {
            // *** GET THE ORDER DETAILS **
        }

        private async Task OnSave()
        {
            // *** SAVE THE CURRENT ORDER WITH IT'S NEW STATE
        }
    }
}