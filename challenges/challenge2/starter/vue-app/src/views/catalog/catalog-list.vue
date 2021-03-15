<script>
import CardContent from '@/components/card-content.vue';

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
    reward: {
      type: Number,
      default: () => 0,
    },
    eventId: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
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
            :id="icecream.Id"
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
            :eventId="eventId"
            :reward="reward"
          />
        </div>
      </div>
    </div>
  </div>
</template>
