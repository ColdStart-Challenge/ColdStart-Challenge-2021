# ColdStart Challenge 2: Getting serious about Data 📂

Welcome to the 🧊 **ColdStart coding challenge** 🧊! In this series you will use your cloud development skills to help our penguin siblings with starting up their ice cream parlor and delivery service 🍨. Learn more about the penguin's [backstory](../../BackStory.md).

![Cold Start Logo](../../assets/COLDSTART-TRUCK-400x300.png)

Learn more about how it works and how you can **win something** [here](../../README.md).

In this **second coding challenge**, your task will be to improve the ColdStart website by storing the data in a relational database in the cloud, and boost customer demand through ice cream recommendations. You will again have **two weeks to complete** this exercise.

If you missed the first coding challenge, we have published a [possible solution](../challenge1/finished) for you to continue to work on.

> 📣 Share your feedback and tell your friends about this program on social media [\#coldstartchallenge](https://twitter.com/search?q=%23coldstartchallenge)!

---

## Challenge Description 🐧

In this second challenge we will focus on **more robust data storage** in the web application and we'll also improve the web application to show **personalized product recommendations** to the customers to drive more ice cream sales. In this challenge you will have to meet 3 objectives.

Currently the web application does not have a data storage layer, apart from a JSON document containing the ice cream catalog. As the web application further evolves, we need to have a reliable data storage layer. Your first mission in this challenge will be to **use an [Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview?ocid=aid3027557)** for storing the ice cream catalog and customer orders. You will **update the API components** of the Static Web Application to connect to this Azure SQL Database.

Azure SQL Database is a fully managed platform as a service (PaaS) database engine that handles most of the database management functions such as upgrading, patching, backups, and monitoring without user involvement. What this boils down to is that you only need to worry about the contents of the database and all infrastructure for keeping the database is handled for you!

We have included example SQL scripts to create the database tables. Here's the script for the `Icecreams` table:

```sql
CREATE TABLE dbo.Icecreams (
	[Id] int primary key clustered,
	[Name] nvarchar(255) not null,
	[Description] nvarchar(2000) not null,
	[ImageUrl] nvarchar(2000) not null
)
```

Before the web application was available, the penguins captured customer pre-orders in a CSV file. The second objective of this challenge is to **import the customer pre-orders into the Azure SQL Database**. You can of course manually insert all these entries in the database, however that is an error-prone and time-consuming process. Instead, you will [**use Azure Data Factory**](https://docs.microsoft.com/en-us/azure/data-factory/introduction?ocid=aid3027557) to automate this import process from CSV into the SQL Database.

Here's an extract of the customer orders [CSV file](./starter/data/coldstart-orders-historical.csv):

```csv
User,Date,Id,IcecreamId
patsy,2020-07-13 18:18:15,92FD2855-C015-3DA7-5BC7-71938F8A4565,4
patsy,2020-08-21 22:31:33,E8BD5B46-8138-6B27-44F9-670791077567,9
Anna,2020-09-25 21:54:51,DE0D32BC-14BA-7ED6-5E6A-BFE723F2E847,9
lance.topper,2020-08-25 11:09:19,42023781-DB7D-D769-B9BB-8A290966BF91,10
```

Using Azure Data Factory, you can create and schedule data-driven workflows (called pipelines) that can ingest data from disparate data stores. You can build complex ETL processes that transform data visually with data flows or by using compute services such as Azure HDInsight Hadoop, Azure Databricks, and Azure SQL Database.

As a final mission in this challenge, you will add **personalized product recommendations** in the web application frontend using [**Azure Personalizer**](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/what-is-personalizer?ocid=aid3027557). Azure Personalizer is a cloud-based service that helps your applications choose the best content item to show your users. You can use the Personalizer service to determine what product to suggest to shoppers or to figure out the optimal position for an advertisement. After the content is shown to the user, your application monitors the user's reaction and reports a reward score back to the Personalizer service. This ensures continuous improvement of the machine learning model, and Personalizer's ability to select the best content item based on the contextual information it receives.

As user context for the personalized recommendation you can use the following elements:

* browser type
* time of day
* day of week
* logged in status


## Challenge Objectives 🥇

In this second coding challenge you will extend your current web application and need to unlock the following achievements:

1. Create an Azure SQL Database and connect the web application to it to retrieve the catalog items and store customer pre-orders.
2. Import existing pre-orders from a CSV file into the database using Azure Data Factory - post your ARM template for your ADF workflow in your GitHub repository.
3. Use Azure Personalizer to show 1 recommended ice cream to the user in the web application.

## Resources

- [Challenge 1 solution](../challenge1/finished)
- [Database table creation scripts](./starter/scripts)
- [Pre-orders CSV file](./starter/data/coldstart-orders-historical.csv)

## Learning Resources 📖

- **Azure SQL Database**
    - [What is Azure SQL](https://docs.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview?ocid=aid3027557)
    - [Quickstart to create a single Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal&ocid=aid3027557)

- **Azure Data Factory**
    - [What is Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/introduction?ocid=aid3027557)
    - [Using Azure Data Factory to insert a CSV into Azure SQL](https://blog.seandaylor.com/azure-data-factory-to-sql-server/?ocid=aid3027557)
- **Azure Personalizer**
    - [What is Personalizer](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/what-is-personalizer?ocid=aid3027557)
    - [Personalizer client library quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/quickstart-personalizer-sdk?ocid=aid3027557)
    - [How Personalizer works](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/how-personalizer-works?ocid=aid3027557)

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
