using ColdStartChallenge.DriverApp.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ColdStartChallenge.DriverApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
            BindingContext = new LoginPageViewModel(Navigation);
        }

        //protected override void OnDisappearing()
        //{
        //    if(Navigation.NavigationStack.Last() != this)
        //        Navigation.RemovePage(this);

        //    base.OnDisappearing();
        //}
    }
}