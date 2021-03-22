# ColdStart Challenge 3: Fire up the production lines 🏭

Welcome to the 🧊 **ColdStart coding challenge** 🧊! In this series you will use your cloud development skills to help our penguin siblings with starting up their ice cream parlor and delivery service 🍨. Learn more about the penguin's [backstory](../../BackStory.md).

![Cold Start Logo](../../assets/COLDSTART-TRUCK-400x300.png)

Learn more about how it works and how you can **win something** [here](../../README.md).

In this **third coding challenge**, you will implement the backend services to process the customer orders, and get the production lines up-and-running. You will again have **two weeks to complete** this exercise.

If you missed the previous coding challenges, we have published a [possible solution](../challenge2/finished) for you to continue to work on.

> 📣 Share your feedback and tell your friends about this program on social media [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge)!

---

## Challenge Description 🐧

This third challenge we will focus on **implementing the backend APIs for processing the customer orders**. In the previous challenges you built the web fontend, and stored the customer orders in a queue. You will now grab the messages from the queue, store them in a backend database and send them off to the factory. By using a queue we decoupled the order creation and the actual processing, allowing us to scale the web frontend and backend services independently. To make sure all customer requests are handled in a timely fashion, you will put in place an infrastructure that can automatically scale based on demand. To complete this challenge, you will need to achieve **three objectives**.

In the first objective, for the backend services, you will use **[Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction?ocid=aid3027557)** as the data store. Azure Cosmos DB is a fully managed NoSQL database for modern app development. As a fully managed service, Azure Cosmos DB takes database administration off your hands with automatic management, updates and patching. It also handles capacity management with cost-effective serverless and automatic scaling options that respond to application needs to match capacity with demand.

Your second objective will be to **implement an [Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview?ocid=aid3027557)** that is triggered when a new order arrives in the queue. Azure Functions provides "compute on-demand", which is the essence of serverless computing. Azure Functions allows you to implement your system's logic into readily available blocks of code, called "functions". Different functions can run anytime you need to respond to critical events. As requests increase, Azure Functions meets the demand with as many resources and function instances as necessary - but only while needed. As requests fall, any extra resources and application instances drop off automatically. 

In this queue-triggered function, you will take the customer order from the queue, reformat the JSON document, update the status from 'New' to 'Accepted' and finally store the order in Cosmos DB. The new order JSON format is the following:

```json
{
    "id": "032FAB78-9A86-EB11-85AA-000D3AB17B7E",
    "user": "anonymous",
    "date": "2021-03-16T20:59:18.247Z",
    "icecream": {
        "icecreamId": 5,
        "name": "Blue Lagoon",
        "description": "Blueberry and melon ice cream bar.",
        "imageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream5.png"
    },
    "status": "Accepted",
    "driver": {
        "driverId": null,
        "name": null,
        "imageUrl": null
    },
    "fullAddress": "1, Microsoft Way, Redmond, Washington",
    "deliveryPosition": null,
    "lastPosition": null
  ```

The third objective will be to **implement a second Azure Function, triggered on a time schedule**, that will read the Cosmos DB and process all 'Accepted' orders. This second function simulates the processing of customer orders in the ice cream factory. The function should perform the following tasks:

- Update the order status to 'Ready'
- Calculate the `deliveryPosition` field with the GPS position (latitude,longitude) for the `fullAddress`.

As Azure Functions scales automatically based on demand, and our first function is triggered by messages arriving in the Azure Queue, we now have a fully serverless and auto-scalable backend solution in place.

> **Note:** for the implementation of the Azure Functions you can use many different programming languages (Node.js, .NET, Python, ...). You are free to choose whatever language you prefer.

## Challenge Objectives 🥇

In this third coding challenge you will extend your current web application and need to unlock the following achievements:

1. Create an Azure Cosmos DB to keep track of customer order processing.
2. Implement a queue-triggered Azure Function to grab the orders from the queue, reformat them, update their status and store them in Cosmos DB.
3. Implement a time-triggered Azure Function to update the order status and delivery GPS position.

## Resources

- [Challenge 2 solution](../challenge2/finished)

## Learning Resources 📖

- **Azure Functions**
    - [Introduction to Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview?ocid=aid3027557)
    - [Quickstart creating a C# Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-csharp?ocid=aid3027557)
    - [Develop and debug locally](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local?ocid=aid3027557)
    - [Azure Functions and Cosmos DB](https://docs.microsoft.com/en-us/azure/azure-functions/functions-integrate-store-unstructured-data-cosmosdb?tabs=javascript?ocid=aid3027557)
    - [Create serverless applications (MS Learn)](https://docs.microsoft.com/en-us/learn/paths/create-serverless-applications/?ocid=aid3027557)
- **Cosmos DB**
    - [Introduction to Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction?ocid=aid3027557)
    - [Quickstart creating a Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/create-cosmosdb-resources-portal?ocid=aid3027557)
    - [Insert and query data in Cosmos DB (MS Learn)](https://docs.microsoft.com/en-us/learn/modules/access-data-with-cosmos-db-and-sql-api/?ocid=aid3027557)

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
