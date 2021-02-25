<script>
import CardContent from '@/components/card-content.vue';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '@/assets/js/userInfo';
import { QueueServiceClient } from '@azure/storage-queue';

import axios from 'axios';

const API = process.env.VUE_APP_API || 'api';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  data() {
    return {
      isAuthenticated: false,
      user: {},
      guid: '',
    };
  },
  mounted() {
    this.getIsAuthenticated();
    this.getGUID();
  },
  methods: {
    clicked(item) {
      console.log(item);
      if (item.Id) {
        console.log('Valid submit event payload!');
        this.getGUID();
        const ret = {
          Id: this.guid.toUpperCase(),
          User: this.user.userDetails,
          Date: new Date().toISOString(),
          IcecreamId: item.Id,
          Status: 'New',
          DriverId: null,
          FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
          LastPosition: null,
        };
        console.log(ret);

        // this.addMessageToQueue(ret);
        const headers = {
          'x-ms-client-principal': this.user.userDetails,
        };
        axios.post(`${API}/orders`, ret, {
          headers,
        });


        return true;
      }
      console.warn('Invalid submit event payload!');
      return false;
    },
    async addMessageToQueue(ret) {
      // Retrieve the connection from an environment
      // variable called AZURE_STORAGE_CONNECTION_STRING
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

      // Create a unique name for the queue
      const queueName = 'preorder';

      console.log('Preordering queue: ', queueName);

      // Instantiate a QueueServiceClient which will be used
      // to create a QueueClient and to list all the queues
      const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

      // Get a QueueClient which will be used
      // to create and manipulate a queue
      const queueClient = queueServiceClient.getQueueClient(queueName);

      // Create the queue
      // await queueClient.create();

      const retStr = JSON.stringify(ret);

      console.log('Adding message to the queue: ', retStr);

      // Add a message to the queue
      await queueClient.sendMessage(retStr);
    },
    getIsAuthenticated() {
      getUserInfo().then((r) => {
        console.log(r);
        this.isAuthenticated = (r !== null);
        this.user = r;
      },
      () => {
        this.user = {};
      });
    },
    getGUID() {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = ((dt + Math.random() * 16) % 16) | 0; // eslint-disable-line no-bitwise
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16); // eslint-disable-line no-bitwise
      });
      this.guid = uuid;
      console.log(this.guid);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <div
        v-for="(icecream) in icecreams"
        :key="icecream.Id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
          />
          <ButtonFooter @clicked="clicked"
            :item="icecream"
            label="Add To Cart"
            class="primary"
            v-if="isAuthenticated === true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
