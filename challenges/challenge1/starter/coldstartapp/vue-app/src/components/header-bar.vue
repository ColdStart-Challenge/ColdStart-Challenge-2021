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
      const userInfo = getUserInfo();
      userInfo.then((result) => {
        console.log(result);
        return {
          isAuthenticated: true,
        };
      }, (err) => {
        console.error(err);
        return {
          isAuthenticated: false,
        };
      });
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
          <router-link v-if="isAuthenticated === true" class="navbar-item nav-auth-link" to="/logout">
            Logout</router-link>
          <router-link v-else class="navbar-item nav-auth-link" to="/login">
            Login</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
