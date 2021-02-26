<script>
import ButtonFooter from '@/components/button-footer.vue';
import { mapActions, mapGetters } from 'vuex';
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'CardContent',
  components: {
    ButtonFooter,
  },
  props: {
    id: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
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
  computed: {
    ...mapGetters('order', { order: 'order' }),
  },
  methods: {
    ...mapActions('order', ['postOrderAction']),
    async clicked(item) {
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
        try {
          const o = await this.postOrderAction(ret);
          console.log(o);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
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
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
      <ButtonFooter @clicked="clicked"
            :item="icecream"
            label="Add To Cart"
            class="primary"
            v-if="isAuthenticated === true"
          />
    </div>
  </div>
</template>
