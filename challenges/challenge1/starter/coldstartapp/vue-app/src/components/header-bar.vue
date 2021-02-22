<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';

import axios from 'axios';
import API from '../store/config';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
  },
  data() {
      try {
    console.log('getUserInfo');
    const response = fetch(`${API}/.auth/me`);
    const payload = response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
    // return clientPrincipal;
  } catch (error) {
    console.error('No profile could be found');
    // return undefined;
  }

    return {
      "userInfo": clientPrincipal
    };
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
          <div v-if="clientPrincipal"><router-link class="navbar-item nav-auth-link" to="/login">Login</router-link></div>
          <div v-if="!clientPrincipal"><router-link class="navbar-item nav-auth-link" to="/logout">logout</router-link></div>
        </div>
      </div>
    </nav>
  </header>
</template>
