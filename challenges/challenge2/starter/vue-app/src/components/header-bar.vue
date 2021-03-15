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
  mounted() {
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
          <AuthLogin class="navbar-item nav-auth-link"
            v-if="isAuthenticated === false" provider="github"></AuthLogin>
          <AuthLogin class="navbar-item nav-auth-link"
            v-if="isAuthenticated === false" provider="facebook"></AuthLogin>
          <AuthLogout class="navbar-item nav-auth-link"
            v-if="isAuthenticated === true"></AuthLogout>
        </div>
      </div>

    </nav>
  </header>
</template>
