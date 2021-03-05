<script>
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'CardContent',
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
      errorMessage: '',
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
    <div class="buttons" v-if="user">
      <ButtonFooter v-if="user" label="Place Order" />
    </div>
  </div>
</template>
