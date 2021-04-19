using ColdStartChallenge.DriverApp.Models;
using System;
using System.Globalization;
using Xamarin.Forms;

namespace ColdStartChallenge.DriverApp.Converters
{
    public class SelectedSortOptionToColorConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if(value is SortOption selectedSo && parameter is SortOption so)
            {
                if (selectedSo == so)
                {
                    return (Color)Application.Current.Resources["ColorPrimaryDark"];
                }
            }
            return (Color)Application.Current.Resources["ColorPrimary"];
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
