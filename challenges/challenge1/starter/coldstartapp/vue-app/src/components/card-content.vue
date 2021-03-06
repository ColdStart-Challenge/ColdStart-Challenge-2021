<script>
import { mapActions } from 'vuex';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'CardContent',
  props: {
    id: {
      type: Number,
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
      placePreOrderFeedback: '',
      user: undefined,
    };
  },
  components: {
    ButtonFooter,
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
    ...mapActions('orders', ['placePreOrderAction']),
    async placePreOrder() {
      this.placePreOrderFeedback = undefined;
      try {
        await this.placePreOrderAction(this.id);
        this.placePreOrderFeedback = 'Pre-order placed!';
      } catch (error) {
        this.placePreOrderFeedback = 'Pre-order could not be processed!';
      }
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
    </div>
    <div class="card-footer" v-if="user">
      <ButtonFooter label="Place Pre-order" @clicked="placePreOrder" v-if="!placePreOrderFeedback"/>
      <div class="card-footer-item" v-if="placePreOrderFeedback">{{placePreOrderFeedback}}</div>
    </div>
  </div>
</template>
