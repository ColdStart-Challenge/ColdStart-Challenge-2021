# ColdStart Challenge 1: ColdStart on the Web 🌎

Welcome to the 🧊 **ColdStart coding challenge** 🧊! In this series you will use your cloud development skills to help our penguin siblings with starting up their ice cream parlor and delivery service 🍨. Learn more about the penguin's [backstory](../../BackStory.md).

![Cold Start Logo](../../assets/COLDSTART-TRUCK-400x300.png)

We will release a new coding challenge **every fortnight**, which you can then work on by yourself or you can team up with your peers. After two weeks we'll then share the solution to the challenge. So, if you skipped one excercise you can jump back in with the next. 

There are **6 coding challenges** in total and of course we hope you'll join for all of them! If you're one of the first 40 participants to **complete 3 of the first 5** coding challenges, you'll **receive an IoT device** that will help you complete the last, IoT-based challenge!

In this **first coding challenge**, your task will be to help the penguins move their business online and collect customer pre-orders. You will have **two weeks to complete** this exercise.


> 📣 Share your feedback and tell your friends about this program on social media [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge)!

---

## Challenge Description 🐧

The two penguins want to draw potential customers to their business as quickly as possible, so their first goal is to put the *ColdStart* brand on the interwebs. Everyone needs to see what awesome, freezing goodies they have in store and start placing pre-orders, while the production lines are fired up!

Your first mission will be to **create a website** that allows customers to browse the catalog of delicious ice cream and to make pre-orders. For now, the catalog data will be coming from a static JSON file. Anonymous users can browse a list of products, however **to pre-order the user needs to authenticate** with a social identity (e.g. Google, Twitter, Facebook, GitHub, Azure Active Directory). To get you started, we have prepared a **[starter web application](./starter/coldstartapp)**.

The website should be hosted on Azure, allowing the business to flexibly scale as their business grows. There are many different options to host a website on Azure, ranging from a virtual machine, a managed Kubernetes cluster (AKS), or an Azure Web App. As the ColdStart website is built as a static web application, we will use the **[Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/overview?ocid=aid3027557)** service to host it. It allows to easily hosting of the static web content, such as HTML, CSS, JavaScript and images, and it has integrated API support with Azure Functions. What's more: updating and deploying your website is handled automatically using a GitHub Actions workflow.

When a customer pre-orders an ice cream through the website, a customer pre-order JSON document will be created and saved in a queue on **[Azure Queue Storage](https://docs.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction?ocid=aid3027557)**. Using a queue allows you to decouple the frontend from the backend services. This has the advantage that the frontend can continue to serve customers, even if the backend is not available, or processes requests at a slower pace.

This is what the pre-order JSON document should look like:

```json
{
    "Id": "0B476647-586A-EB11-9889-000D3AB17657",
    "User": "Pip Doe",
    "Date": "2021-02-08T21:54:56.260Z",
    "IcecreamId": 1,
    "Status": "New",
    "DriverId": null,
    "FullAddress": "1 Microsoft Way, Redmond, WA 98052, USA",
    "LastPosition": null
}
```


## Challenge Objectives 🥇

To successfully complete this first challenge, you will need to:

1. Build and host a website on Azure Static Websites. 
2. Only authenticated users can pre-order items.
3. The customer pre-order JSON document needs to be stored in Azure Queue Storage.

## Resources 🧰

- **[starter web application](./starter/coldstartapp)**
- **[finished solution](./finished/coldstartapp)**

## Learning Resources 📖

- **Azure Static Web Apps**
    - [About Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/overview?ocid=aid3027557)
    - [Build your first static web app](https://docs.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=vanilla-javascript?ocid=aid3027557)
    - [Authentication and authorization](https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization?ocid=aid3027557)
    - [Static Web Apps learning path (MS Learn)](https://docs.microsoft.com/en-us/learn/paths/azure-static-web-apps/?ocid=aid3027557)
- **Azure Queue Storage**
    - [What are Azure Queues](https://docs.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction?ocid=aid3027557)
    - [JavaScript quickstart](https://docs.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-nodejs?ocid=aid3027557)
    - [How to use Azure Queue Storage from Node.js](https://docs.microsoft.com/en-us/azure/storage/queues/storage-nodejs-how-to-use-queues?tabs=javascript&ocid=aid3027557)
    - [Communicate between apps with Azure Queue Storage (MS Learn)](https://docs.microsoft.com/en-us/learn/modules/communicate-between-apps-with-azure-queue-storage/?ocid=aid3027557)

## Tools Used 🚀

- ✅ [Visual Studio Code](https://code.visualstudio.com?ocid=aid3027557)
- ✅ [Get an Azure free account](https://azure.microsoft.com/en-us/free/?ocid=aid3027557) or DM us [on Twitter](https://twitter.com/msdev_be) and we'll provide you with a 30-day Azure Pass (depending on availability).
- ✅ [GitHub account](https://github.com/).
- ✅ [Azure Static Web Apps extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps).

---

## Submit your solutions? 🔥

Within 2 weeks of making the coding challenge public, **submit your solution as a Challenge Solution Submission ISSUE** to this GitHub repository.

 1. Create your own Github repo with your solution for that challenge or fork this repo.
 2. Create a new [Challenge Solution Submission ISSUE](https://github.com/ColdStart-Challenge/ColdStart-Challenge-2021/issues/new/choose) in our repo for each challenge and fill all the details.
 3. Submit the issue.


## Questions? Comments? 🙋‍♀️

If you have any questions about the challenges, feel free to open an **[ISSUE HERE](https://github.com/ColdStart-Challenge/ColdStart-Challenge-2021/issues/new/choose)**.

You can also reach us on Twitter by mentioning the [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge) hashtag.
