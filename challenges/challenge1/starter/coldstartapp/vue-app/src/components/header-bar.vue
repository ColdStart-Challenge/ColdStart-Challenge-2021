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
      errorMessage: '',
      user: undefined,
    };
  },
  async created() {
    this.user = await getUserInfo();
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
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" v-if="!user">
                Login
              </a>
              <div class="navbar-dropdown" v-if="!user">
                <a class="navbar-item">
                  <AuthLogin provider="GitHub" v-if="!user" />
                </a>
                <a class="navbar-item">
                  <AuthLogin provider="Twitter" v-if="!user" />
                </a>
                <a class="navbar-item">
                  <AuthLogin provider="Google" v-if="!user" />
                </a>
                <a class="navbar-item">
                  <AuthLogin provider="Facebook" v-if="!user" />
                </a>
                <a class="navbar-item">
                  <AuthLogin provider="AAD" v-if="!user" />
                </a>
              </div>
            </div>
            <div class="navbar-item">
               <a class="navbar-item">
                 <AuthLogout v-if="user" />
               </a>
            </div>
            <div class="navbar-item">
               <a class="navbar-item" v-if="user">
                  <p> Welcome, {{user.userDetails}}! </p>
               </a>
            </div>
        </div>
      </div>
    </nav>
  </header>
</template>
