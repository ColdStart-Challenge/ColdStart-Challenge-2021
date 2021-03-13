# ColdStart Web Application - Getting started

## Introduction

This is a starter web application for Azure Static Web Apps. It consists of two components:

- Vue.js frontend
- Node.js backend apis, running on Azure Functions


## Running the solution locally

### Frontend

The frontend application is developed using Vue.js. It will communicate directly with the backend APIs included in the starter application.

```cmd
cd vue-app
npm install
npm run serve
```

### Backend APIs

The backend APIs are hosted using Azure Functions and can be run locally using the Azure Functions Core Tools.

> Make sure to rename `local.setting.json` to `local.settings.json`. The setting**s** file is excluded to not expose any local secrets in the GitHub repository.


```cmd
cd api
npm install
npm start
```

## Prerequisites

- ✅ [Visual Studio Code](https://code.visualstudio.com?ocid=aid3027557)
- ✅ [Aure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?ocid=aid3027557)
