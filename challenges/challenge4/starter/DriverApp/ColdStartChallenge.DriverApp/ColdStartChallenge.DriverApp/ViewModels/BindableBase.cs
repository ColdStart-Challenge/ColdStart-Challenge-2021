using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace ColdStartChallenge.DriverApp.ViewModels
{
    public class BindableBase : INotifyPropertyChanged
    {
        protected void RaisePropertyChanged([CallerMemberName] string property = null)
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(property));

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
