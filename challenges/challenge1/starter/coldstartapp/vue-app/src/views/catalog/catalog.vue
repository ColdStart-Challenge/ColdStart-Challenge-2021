<script>

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: '',
      message: '',
      routePath: '/catalog',
      title: 'Our Ice Creams',
    };
  },
  components: {
  },
  async created() {
    // TODO: Get the catalog
  },
  computed: {
  },
  methods: {
  },
};
</script>

<template>
  <div class="content-container">
    <p>Look at our amazing selection of ice creams!</p>

    <!-- display the list of ice creams here -->
  </div>
</template>
