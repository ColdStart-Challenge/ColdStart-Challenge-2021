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
  },
  methods: {
    clicked(item) {
      console.log(item);
      if (item.Id) {
        console.log('Valid submit event payload!');
        const ret = {
          IcecreamId: item.Id,
        };
        console.log(ret);

        const headers = {
          'x-ms-client-principal': btoa(this.user.userDetails),
        };
        axios.post(`${API}/orders`, ret, {
          headers,
        });


        return true;
      }
      console.warn('Invalid submit event payload!');
      return false;
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
