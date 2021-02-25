<script>
import CardContent from '@/components/card-content.vue';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '@/assets/js/userInfo';
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
        console.log(this.user.userDetails);
        console.log(btoa(this.user.userDetails));
        const ret = {
          IcecreamId: item.Id,
          User: this.user.userDetails,
        };
        console.log(ret);
        const p = btoa(this.user.userDetails);
        console.log(p);

        const headers = {
          headers: {
            'x-ms-client-principal': p,
          },
        };

        axios.post(`${API}/orders`, ret, {
          headers,
        });

        // axios.post(`${API}/orders`, ret);

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
