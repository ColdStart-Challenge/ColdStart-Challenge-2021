<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import getUserInfo from '@/assets/js/userInfo';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.getIsAuthenticated();
  },
  methods: {
    getIsAuthenticated() {
      getUserInfo().then((r) => { this.isAuthenticated = (r !== null); },
        () => { this.isAuthenticated = false; });
    },
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
          <!-- <router-link v-if="isAuthenticated === true"
            class="navbar-item nav-auth-link" to="/logout">
            Logout</router-link>
          <router-link v-else class="navbar-item nav-auth-link" to="/login">
            Login</router-link> -->
        </div>
      </div>
      <AuthLogout v-if="isAuthenticated === true"><AuthLogout>
      <AuthLogin v-if="isAuthenticated === false" ><AuthLogin>
    </nav>
  </header>
</template>
