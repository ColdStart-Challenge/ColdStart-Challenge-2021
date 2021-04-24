using System;
using ColdStartChallenge.DriverApp.Models;
using ColdStartChallenge.DriverApp.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ColdStartChallenge.DriverApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DeliveryDetailPage : ContentPage
    {
        public DeliveryDetailPage(Guid orderId, OrderStatus orderStatus = OrderStatus.Ready)
        {
            InitializeComponent();
            BindingContext = new DeliveryDetailPageViewModel(Navigation, orderId, orderStatus);
        }
    }
}