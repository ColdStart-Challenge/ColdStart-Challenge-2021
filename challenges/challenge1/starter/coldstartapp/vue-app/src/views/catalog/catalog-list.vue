<script>
import CardContent from '@/components/card-content.vue';
import ButtonFooter from '@/components/button-footer.vue';

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
    };
  },
  methods: {
    clicked: ({ item }) => {
      if (item) {
        console.log('Valid submit event payload!');
        return true;
      }
      console.warn('Invalid submit event payload!');
      return false;
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
