<script>
import HeaderBar from '@/components/header-bar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    HeaderBar,
  },
};
</script>

<template>
  <div id="app">
    <HeaderBar />
    <div class="section columns">
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import 'styles.scss';
</style>
