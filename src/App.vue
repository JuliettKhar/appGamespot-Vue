<template>
  <div>
    <AppHeader/>
      <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/Header-Footer/AppHeader.vue';
import AppFooter from './components/Header-Footer/AppFooter.vue';

export default {
  components:{
    AppHeader,
    AppFooter
  },
  created () {
    this.$store.dispatch('admin/refreshToken');
  },
}
</script>

<style>
  @import './assets/style.css';
</style>
