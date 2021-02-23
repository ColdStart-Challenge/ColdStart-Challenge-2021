<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
  },
  data() {
    try {
      const userInfo = await getUserInfo();
      console.log(userInfo);
      if (userInfo) {
        return {
          isAuthenticated: true,
        };
      }
      return {
        isAuthenticated: false,
      };
    } catch (error) {
      console.log(error);
      console.error('No profile could be found');
      return {
        isAuthenticated: false,
      };
    }
  },
  methods: {
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
          <router-link v-if="!isAuthenticated" class="navbar-item nav-auth-link" to="/login">
            Login</router-link>
          <router-link v-if="isAuthenticated" class="navbar-item nav-auth-link" to="/logout">
            logout</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
