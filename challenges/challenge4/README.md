# ColdStart Challenge 4: Bring it to me 🚚

Welcome to the 🧊 **ColdStart coding challenge** 🧊! In this series you will use your cloud development skills to help our penguin siblings with starting up their ice cream parlor and delivery service 🍨. Learn more about the penguin's [backstory](../../BackStory.md).

![Cold Start Logo](../../assets/COLDSTART-TRUCK-400x300.png)

Learn more about how it works and how you can **win something** [here](../../README.md).

In this **fourth coding challenge**, your goal is to implement the delivery apps: one for the delivery truck drivers and one for the customers to track their order. You will again have **two weeks to complete** this exercise.

If you missed the previous coding challenges, we have published a [possible solution](../challenge3/finished) for you to continue to work on.

> 📣 Share your feedback and tell your friends about this program on social media [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge)!

---

## Challenge Description 🐧

In the fourth coding challenge we will focus on **building mobile apps to track the delivery of the ice creams**. In the previous exercise we processed the customer orders in our factory and have marked the customer order as being 'Ready' for delivery. This allows our delivery penguins to pick up the goods at the ColdStart HQ and bring them to your doorstep! To complete this challeng, you will need to achieve **three objectives**.

The first objective is to implement a **[Xamarin](https://docs.microsoft.com/en-us/xamarin/get-started/what-is-xamarin?ocid=aid3027557) mobile application for the delivery penguins**. By using Xamarin, you can leverage your C# skills to build native mobile applications across multiple platforms. In this mobile application, you will retrieve the list of orders that are ready for delivery. The driver can then select one of those orders and update its status to 'Delivering' and set its driver information. In addition, every few minutes the driver's location will be updated to allow the customer to track the delivery. We have provided you with a [starter](../challenge4/starter) mobile application to get you going smoothly. Also, you will find additional backend APIs for retrieving and updating the orders.

You second objective is to implement a **[Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/?ocid=aid3027557) WebAssembly application for the customers to track their order**. With Blazor you can again use your C# skills to build a single-page web application. There are two [hosting models](https://docs.microsoft.com/en-us/aspnet/core/blazor/hosting-models?ocid=aid3027557) for Blazor applications. We'll use the WebAssembly model because it allows us to host the web application in Azure Static Web Apps, which you have used in the first coding challenges. The web application will allow the customer to get the list of their orders and view the details of their open order and track the driver's location on a map. We have provided you with a [starter](../challenge4/starter) application to give you a head start.

The final objective will be to **add [SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-overview?ocid=aid3027557) notifications in the Blazor application** to notify the user of changes in their orders. A notification will be sent to the user when a delivery penguins picks the order for delivery. You will use the Azure SignalR Service so that you don't need to setup a SignalR server yourself, and manage its infrastructure and deal with scaling it up and down.

> **Note:** for the implementation of the Xamarin application you can choose your target mobile platform.

## Challenge Objectives 🥇

In this fourth coding challenge you will build the delivery applications and will need to unlock the following achievements:

1. Build a Xamarin application for the delivery drivers
2. Implement a Blazor WebAssembly application for customers to track their order
3. Add SignalR notifications to the Blazor web application

## Resources

- [Challenge 4 starter](../challenge4/starter)

## Learning Resources 📖

- **Xamarin**
    - [What is Xamarin](https://docs.microsoft.com/en-us/xamarin/get-started/what-is-xamarin?ocid=aid3027557)
    - [Xamarin.Forms quickstarts](https://docs.microsoft.com/en-us/xamarin/get-started/quickstarts/?ocid=aid3027557)
    - [Build mobile apps with Xamarin.Forms (MS Learn)](https://docs.microsoft.com/en-us/learn/paths/build-mobile-apps-with-xamarin-forms/?ocid=aid3027557)
- **Blazor**
  - [Overview of Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/?ocid=aid3027557)
  - [Tutorial: Build a Blazor todo list app](https://docs.microsoft.com/en-us/aspnet/core/tutorials/build-a-blazor-app?ocid=aid3027557)
  - [Connecting Blazor to Azure SignalR Service](https://blazorhelpwebsite.com/ViewBlogPost/32)
  - [Authenticate Blazor WebAssembly with Static Web Apps](https://anthonychu.ca/post/blazor-auth-azure-static-web-apps/)
- **Azure SignalR**
  - [Introduction to Azure SignalR Service](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-overview?ocid=aid3027557)
  - [Quickstart: using JavaScript with Azure SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-quickstart-azure-functions-javascript?ocid=aid3027557)

## Tools Used 🚀

- ✅ [Visual Studio Code](https://code.visualstudio.com?ocid=aid3027557)
- ✅ [Get an Azure free account](https://azure.microsoft.com/en-us/free/?ocid=aid3027557) or DM us [on Twitter](https://twitter.com/msdev_be) and we'll provide you with a 30-day Azure Pass (depending on availability).
- ✅ [GitHub account](https://github.com/).

---

## Submit your solutions? 🔥

Within 2 weeks of making the coding challenge public, **submit your solution as a Challenge Solution Submission ISSUE** to this GitHub repository.

 1. Create your own Github repo with your solution for that challenge or fork this repo.
 2. Create a new [Challenge Solution Submission ISSUE](https://github.com/ColdStart-Challenge/ColdStart-Challenge-2021/issues/new/choose) in our repo for each challenge and fill all the details.
 3. Submit the issue.


## Questions? Comments? 🙋‍♀️

If you have any questions about the challenges, feel free to open an **[ISSUE HERE](https://github.com/ColdStart-Challenge/ColdStart-Challenge-2021/issues/new/choose)**.

You can also reach us on Twitter by mentioning the [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge) hashtag.
