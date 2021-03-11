<script>
import ButtonFooter from '@/components/button-footer.vue';
import { mapActions, mapGetters } from 'vuex';
import getUserInfo from '@/assets/js/userInfo';
import x from 'vue-simple-alert';

export default {
  name: 'CardContent',
  components: {
    ButtonFooter,
  },
  props: {
    id: {
      type: Number,
      default: () => -1,
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
    eventId: {
      type: String,
      default: () => null,
    },
    reward: {
      type: Number,
      default: () => 0,
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
    ...mapActions('reward', ['postRewardAction']),
    async clicked(item) {
      if (item.id) {
        const ShippingAddress = '1 Microsoft Way, Redmond, WA 98052, USA';
        // prompt(message, defaultText, title, type, reverseButton)
        x.prompt('Input your shipping address', ShippingAddress).then(async (text) => {
          const ret = {
            IcecreamId: item.id,
            ShippingAddress: text,
          };

          try {
            await this.postOrderAction(ret);
          } catch (error) {
            console.error(error);
            return false;
          }
        });
      }
      try {
        await this.postRewardAction({
          EventId: item.eventId,
          Reward: item.reward,
        });
      } catch (error) {
        console.error(error);
        return false;
      }
      return true;
    },
    getIsAuthenticated() {
      getUserInfo().then(
        (r) => {
          this.isAuthenticated = Boolean(r && r.identityProvider);
        },
        () => {
          this.isAuthenticated = false;
        },
      );
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
      <ButtonFooter
        @clicked="clicked"
        :item="{ id: this.id, eventId: this.eventId, reward: this.reward }"
        label="Add To Cart"
        class="primary"
        v-if="isAuthenticated === true"
      />
    </div>
  </div>
</template>
