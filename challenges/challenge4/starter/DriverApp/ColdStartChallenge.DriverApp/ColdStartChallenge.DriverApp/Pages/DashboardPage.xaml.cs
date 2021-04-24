using ColdStartChallenge.DriverApp.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ColdStartChallenge.DriverApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DashboardPage : ContentPage
    {
        public DashboardPage()
        {
            InitializeComponent();
            BindingContext = new DashboardPageViewModel(Navigation);
        }
    }
}