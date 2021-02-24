<script>
import CardContent from '@/components/card-content.vue';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '@/assets/js/userInfo';
import VueUUID from 'vue-uuid';

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
      guid: VueUUID.v1(),
    };
  },
  mounted() {
    this.getIsAuthenticated();
  },
  methods: {
    clicked: (item) => {
      console.log(item);
      if (item.Id) {
        console.log('Valid submit event payload!');
        const ret = {
          Id: VueUUID.v1(),
          User: this.user.userDetails,
          Date: Date.now().toString(),
          IcecreamId: item.Id,
          Status: 'New',
          DriverId: null,
          FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
          LastPosition: null,
        };
        console.log(ret);
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
    getGUID() {
      return VueUUID.v1();
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
