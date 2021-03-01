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
      if (item) {
        const ret = {
          IcecreamId: item,
        };
        try {
          await this.postOrderAction(ret);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return false;
    },
    getIsAuthenticated() {
      getUserInfo().then((r) => {
        console.log(r);
        this.isAuthenticated = Boolean(r && r.identityProvider);
      },
      () => {
        this.isAuthenticated = false;
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
            :item="this.id"
            label="Add To Cart"
            class="primary"
            v-if="isAuthenticated === true"
          />
    </div>
  </div>
</template>
