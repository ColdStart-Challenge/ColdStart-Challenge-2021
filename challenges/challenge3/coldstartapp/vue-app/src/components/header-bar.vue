<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      userInfo: {
        type: Object,
        default() {},
      },
      providers: ['twitter', 'github', 'aad', 'google', 'facebook'],
    };
  },
  async created() {
    this.userInfo = await getUserInfo();
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
        </div>
        <div class="navbar-end">
          <div class="navbar-item nav-home has-dropdown is-hoverable">
            <a class="navbar-link">Authentication</a>
            <div class="navbar-dropdown">
              <template v-if="!userInfo">
                <template v-for="provider in providers">
                  <AuthLogin
                    class="navbar-item auth-link"
                    :key="provider"
                    :provider="provider"
                  />
                </template>
              </template>
              <AuthLogout v-if="userInfo" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
