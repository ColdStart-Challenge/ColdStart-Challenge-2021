using ColdStartChallenge.DriverApp.Models;
using System;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp.ViewModels
{
    public class OrderListItemViewModel : BindableBase
    {
        private readonly Order _order;

        public OrderListItemViewModel(Order order)
        {
            _order = order;
        }

        public Guid Id => _order.Id;
        public string User => _order.User;
        public DateTime Date => _order.Date.DateTime;
        public OrderStatus Status => _order.OrderStatus;
        public string FullAddress => _order.FullAddress;
        public bool IsDelivering => Status == OrderStatus.Delivering;
        public Color StatusColor
        {
            get
            {
                switch(Status)
                {
                    case OrderStatus.Delivering:
                        return (Color)Application.Current.Resources["ColorAccent"];
                    default:
                        return Color.Black;
                }
            }
        }
        public string StatusIcon
        {
            get
            {
                switch(Status)
                {
                    case OrderStatus.Delivering:
                        return MdiFontIcons.PackageVariant;
                    default:
                        return MdiFontIcons.PackageVariantClosed;
                }
            }
        }
    }
}
