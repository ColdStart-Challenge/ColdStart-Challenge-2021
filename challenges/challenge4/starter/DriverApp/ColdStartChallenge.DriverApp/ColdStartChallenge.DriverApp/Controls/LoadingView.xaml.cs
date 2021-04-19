using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ColdStartChallenge.DriverApp.Controls
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoadingView
    {
        public static readonly BindableProperty IsBusyProperty =
               BindableProperty.Create(nameof(IsBusy), typeof(bool), typeof(LoadingView),
                   defaultBindingMode: BindingMode.OneWay, propertyChanged: IsBusyChanged);

        public bool IsBusy
        {
            get => (bool)GetValue(IsBusyProperty);
            set => SetValue(IsBusyProperty, value);
        }

        private static void IsBusyChanged(BindableObject bindable, object oldValue, object newValue)
        {
            if (!(newValue is bool isBusy))
            {
                return;
            }

            if (isBusy)
            {
                ((LoadingView)bindable).StartAnimation();
            }
            else
            {
                ((LoadingView)bindable).CancelLoadingAnimation();
            }
        }

        public LoadingView()
        {
            InitializeComponent();
        }

        private void StartAnimation()
        {
            StartTruckAnimation();
            StartPulseAnimation();
        }

        private void StartPulseAnimation()
        {
            var animation = new Animation(v => LoadingText.Scale = v, 1.5, .75);
            animation.Commit(this, "PulseAnimation", 16, 1000, Easing.Linear, (v, c) => LoadingText.Scale = .75, () => IsBusy);
        }

        private void StartTruckAnimation()
        {
            const double pixelsPerSecond = 400d;
            const int start = -200;
            var end = DeviceDisplay.MainDisplayInfo.Width / DeviceDisplay.MainDisplayInfo.Density;

            var animationDuration = (uint)((end - start) / pixelsPerSecond * 1000);

            var animation = new Animation(v => TruckImage.TranslationX = v, start, end);
            animation.Commit(this, "TruckAnimation", 16, animationDuration, Easing.Linear, (v, c) => TruckImage.Scale = 1, () => IsBusy);
        }

        private void CancelLoadingAnimation()
            => this.CancelAnimations();
    }
}