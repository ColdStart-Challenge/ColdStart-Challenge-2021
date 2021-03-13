# ColdStart Web Application - Challenge 1 Solution

## Introduction

This is a possible solution for the first coding challenge. The objectives were the following:

1. Build and host a website on Azure Static Websites. 
2. Only authenticated users can pre-order items.
3. The customer pre-order JSON document needs to be stored in Azure Queue Storage.

## Solution

The Static Web Applicaton is based on the started web application and uses Vue.js as the front-end technology and Node.js for the backend Azure Function-based APIs.

### Authentication

To authenticate users in an Azure Static Web App, get started by reading the [general concepts](https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization?ocid=aid3027557). Authentication using a number of existing identity providers is handled automatically by the platform.

In our application, we will not define specific roles but rely on the built-in roles: `anonymous` and `authenticated`. All identity providers are enabled by default. If you want to disable a provider, you can specify this in the `routes.json` file.

```json
{
  "routes": [
    {
      "route": "/.auth/login/facebook",
      "statusCode": "404"
    },
    {
      "route": "/.auth/login/google",
      "statusCode": "404"
    }
  ]
}
```

To retrieve the current user information, you make a request to the `/.auth/me` api endpoint. The starter application already contains a helper function `getUserInfo()`, which will return the user details when logged in, or `undefined` when not authenticated.

```javascript
async function getUserInfo() {
  try {
    console.log('getUserInfo');
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
    return clientPrincipal;
  } catch (error) {
    console.error('No profile could be found');
    return undefined;
  }
}
```

You can then use this information in the user interface to selectively enable the pre-order button, depending on the authentication status. For example, in the `catalog-list.vue` we use the `v-if` attribute:

```html
<script>
import getUserInfo from '../../assets/js/userInfo';
...
export default {
  name: 'CatalogList',
  ...
  data() {
    return {
      userInfo: {
        type: Object,
        default() {},
      },
    };
  },
  async created() {
    this.userInfo = await getUserInfo();
  },
};
</script>

<footer class="card-footer">
  <ButtonFooter
    class="edit-item"
    iconClasses="fas fa-shopping-cart"
    @clicked="buyIceCream"
    label="Pre-order"
    :dataIndex="index"
    :dataId="icecream.Id"
    :item="icecream"
    v-if="userInfo"
  />
</footer>
```

In the backend APIs, the user information is available in the `x-ms-client-principal` HTTP request header, as a Base-64 encoded JSON string. The starter application already has a `getUser` helper function defined to retrieve the user information:

```javascript
const getUser = (req) => {
    const header = req.headers["x-ms-client-principal"];
    if (header != undefined) {
        const encoded = Buffer.from(header, "base64");
        const decoded = encoded.toString("ascii");

        return JSON.parse(decoded);
    } else {
        return { userDetails: "John Doe" };
    }
};
```

### Queueing the order

In Azure Functions you have the concept of *Bindings*. Binding to a function is a way of declaratively connecting another resource to the function; bindings may be connected as input bindings, output bindings, or both. Bindings let you avoid hardcoding access to other services. Your function receives data (for example, the content of a queue message) in function parameters. You send data (for example, to create a queue message) by using the return value of the function.

In this challenge, we specify an *output binding* for an [Azure Queue](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue?ocid=aid3027557). This is configured in the `function.json` file:

```json
{
  "bindings": [
    {
      "type": "queue",
      "direction": "out",
      "name": "myQueueItem",
      "queueName": "customer-orders",
      "connection": "AZURE_STORAGE_CONNECTIONSTRING"
    }
  ]
}
```

The connection string for the Azure Queue is referred to using an application setting `AZURE_STORAGE_CONNECTIONSTRING`. When running locally, you need to specify this setting in the `local.settings.json` file - when deploying in Azure, you will configure an application setting in the Azure portal.

To actually write a message to the queue in the function logic, we can refer to it through the `context.bindings` object in the function implementation. The name specified in the function configuration (`myQueueItem`), gives us access to the specific queue.

```javascript
context.bindings.myQueueItem = order;
```

## Running the solution locally

### Frontend

```cmd
cd vue-app
npm install
npm run serve
```

### Backend APIs

```cmd
cd api
npm install
npm start
```
