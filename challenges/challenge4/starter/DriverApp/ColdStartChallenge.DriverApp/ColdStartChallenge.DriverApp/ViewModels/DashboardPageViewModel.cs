using ColdStartChallenge.DriverApp.Navigation;
using ColdStartChallenge.DriverApp.Services;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using ColdStartChallenge.DriverApp.Pages;
using Xamarin.CommunityToolkit.ObjectModel;
using Xamarin.Forms;
using XE = Xamarin.Essentials;
using ColdStartChallenge.DriverApp.Models;
using System.Collections.Generic;

namespace ColdStartChallenge.DriverApp.ViewModels
{
    public class DashboardPageViewModel : ViewModelBase
    {
        private readonly OrderService _orderService;
        private readonly LocationService _locationService;

        private bool _isLoadingLocation;
        private bool _sendLocation;

        public ObservableCollection<OrderListItemViewModel> Orders { get; set; } = new ObservableCollection<OrderListItemViewModel>();

        public ObservableCollection<OrderListItemViewModel> DeliveringOrders { get; set; } = new ObservableCollection<OrderListItemViewModel>();

        private string _greeting;
        public string Greeting 
        {
            get => _greeting;
            set
            {
                if(_greeting != value)
                {
                    _greeting = value;
                    RaisePropertyChanged();
                }
            }
        }

        private OrderListItemViewModel _selectedOrder;
        public OrderListItemViewModel SelectedOrder 
        {
            get => _selectedOrder;
            set
            {
                if(_selectedOrder != value)
                {
                    _selectedOrder = value;
                    RaisePropertyChanged();
                }
            }
        }

        private bool _isRefreshing;
        public bool IsRefreshing
        {
            get => _isRefreshing;
            set
            {
                if (_isRefreshing != value)
                {
                    _isRefreshing = value;
                    RaisePropertyChanged();
                }
            }
        }

        private SelectionMode _selectionMode = SelectionMode.Single;
        public SelectionMode SelectionMode
        {
            get => _selectionMode;
            set
            {
                if (_selectionMode != value)
                {
                    _selectionMode = value;
                    RaisePropertyChanged();
                }
            }
        }

        private string _location;
        public string Location
        {
            get => _location;
            set
            {
                if (_location != value)
                {
                    _location = value;
                    RaisePropertyChanged();
                }
            }
        }

        private string _place;
        public string Place
        {
            get => _place;
            set
            {
                if (_place != value)
                {
                    _place = value;
                    RaisePropertyChanged();
                }
            }
        }

        private SortOption _selectedSortOption = SortOption.Recency;
        public SortOption SelectedSortOption
        {
            get => _selectedSortOption;
            set
            {
                if (_selectedSortOption != value)
                {
                    _selectedSortOption = value;
                    RaisePropertyChanged();

                    switch(_selectedSortOption)
                    {
                        case SortOption.Recency:
                            SelectedSortOptionIcon = MdiFontIcons.Clock;
                            break;
                        case SortOption.Distance:
                            SelectedSortOptionIcon = MdiFontIcons.MapMarkerDistance;
                            break;
                    }
                }
            }
        }

        private string _selectedSortOptionIcon = MdiFontIcons.Clock;
        public string SelectedSortOptionIcon
        {
            get => _selectedSortOptionIcon;
            set
            {
                if (_selectedSortOptionIcon != value)
                {
                    _selectedSortOptionIcon = value;
                    RaisePropertyChanged();
                }
            }
        }

        private bool _isDeliveringVisible;
        public bool IsDeliveringVisible
        {
            get => _isDeliveringVisible;

            set
            {
                if (_isDeliveringVisible != value)
                {
                    _isDeliveringVisible = value;
                    RaisePropertyChanged();
                }
            }
        }

        public IAsyncCommand RefreshCommand => new AsyncCommand(OnLoadItems);
        public IAsyncCommand ItemSelectedCommand => new AsyncCommand(OnItemSelected);
        public IAsyncCommand<OrderListItemViewModel> DeliveyItemSelectedCommand => new AsyncCommand<OrderListItemViewModel>(OnDeliveryItemSelected);

        public IAsyncCommand<SortOption> SortCommand => new AsyncCommand<SortOption>(OnSort);

        public DashboardPageViewModel(INavigation navigation)
            : base(navigation)
        {
            _orderService = new OrderService();
            _locationService = new LocationService();
        }

        protected override Task OnNavigatedFrom()
        {
            SelectedOrder = null;

            StopLocationTimer();

            return base.OnNavigatedFrom();
        }

        protected override async Task OnNavigatedTo(NavigationMode mode)
        {
            LoadGreeting();

            IsBusy = true;

            await Task.WhenAll(
                GetCurrentLocation(),
                LoadOrders(),
                LoadOrders(OrderStatus.Delivering));

            IsBusy = false;
        }

        private void LoadGreeting()
        {
            var now = DateTime.Now;
            string greeting;
            if (now.Hour < 12)
                greeting = "Good morning";
            else if (now.Hour < 18)
                greeting = "Good afternoon";
            else
                greeting = "Good night";

            Greeting = $"{greeting}, {AppData.Instance.User.Name}!";
        }

        private async Task LoadOrders(OrderStatus orderStatus = OrderStatus.Ready)
        {
            Orders.Clear();
            var orders = (await _orderService.GetOrders(SelectedSortOption, orderStatus)).Select(o => new OrderListItemViewModel(o));

            switch (orderStatus)
            {
                case OrderStatus.Ready:
                    Orders = new ObservableCollection<OrderListItemViewModel>(orders);
                    RaisePropertyChanged(nameof(Orders));
                    break;
                case OrderStatus.Delivering:
                    DeliveringOrders = new ObservableCollection<OrderListItemViewModel>(orders);
                    IsDeliveringVisible = DeliveringOrders != null && DeliveringOrders.Any();
                    if (IsDeliveringVisible)
                        StartLocationTimer();

                    RaisePropertyChanged(nameof(DeliveringOrders));
                    break;
            }
        }

        private void StartLocationTimer()
        {
            _sendLocation = true;

            Device.StartTimer(TimeSpan.FromSeconds(15), () =>
            {
                if (_sendLocation)
                    GetCurrentLocation(true);

                //True = Repeat again, False = Stop the timer
                return _sendLocation; 
            });
        }

        private void StopLocationTimer() => _sendLocation = false;

        private async Task OnLoadItems()
        {
            IsRefreshing = true;

            SelectionMode = SelectionMode.None;

            await LoadOrders();

            SelectionMode = SelectionMode.Single;

            IsRefreshing = false;
        }

        private async Task OnItemSelected()
        {
            if (SelectedOrder != null)
            {
                await Navigation.PushAsync(new DeliveryDetailPage(SelectedOrder.Id));
            }
        }

        private async Task OnDeliveryItemSelected(OrderListItemViewModel order)
        {
            if (order != null)
            {
                SelectedOrder = order;
                await Navigation.PushAsync(new DeliveryDetailPage(SelectedOrder.Id, order.Status));
            }
        }

        private async Task GetCurrentLocation(bool sendLocation = false)
        {
            if (_isLoadingLocation)
                return;

            _isLoadingLocation = true;

            var locationDetail = await _locationService.GetLocationDetail();

            if (locationDetail != null)
            {
                FormatLocation(locationDetail.Value.currentLocation, locationDetail.Value.place);

                if (DeliveringOrders != null && DeliveringOrders.Any() && sendLocation)
                {
                    foreach (var order in DeliveringOrders)
                    {
                        System.Diagnostics.Debug.WriteLine($"Order {order.Id} - Updating location {locationDetail.Value.currentLocation.Latitude}-{locationDetail.Value.currentLocation.Longitude}");

                        var deliveringOrder = await _orderService.GetOrder(order.Id, order.Status);
                        deliveringOrder.DriverLocation = new Location() { Latitude = locationDetail.Value.currentLocation.Latitude, Longitude = locationDetail.Value.currentLocation.Longitude };

                        await _orderService.UpdateOrder(deliveringOrder);
                    }
                }
            }

            _isLoadingLocation = false;
        }

        private void FormatLocation(XE.Location location, XE.Placemark placemark)
        {
            if (location != null)
                Location = $"{location.Latitude} - {location.Longitude}" + Environment.NewLine + $"{location.Timestamp.ToLocalTime().ToString()}";

            if (placemark != null)
                Place = $"{placemark.Thoroughfare} {placemark.SubThoroughfare}" + Environment.NewLine + $"{placemark.PostalCode} {placemark.Locality}" + Environment.NewLine + $"{placemark.CountryName}";
        }

        private async Task OnSort(SortOption arg)
        {
            SelectedSortOption = arg;
            await OnLoadItems();
        }
    }
}
