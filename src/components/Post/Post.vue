<template>
  <div class="container post_container">
    <div class="top" v-if="post">
      <div class="post_header"><h1>{{post.title}}</h1></div>
      <div class="post_img" >
        <img :src="post.img" alt="" srcset="">
      </div>
      <div class="post_content" v-html="post.content"></div>
      <div class="post_rating">
        Rating: <span>{{post.rating}} / 5</span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    post () {
      return this.$store.getters['posts/getOnePost'];
    }
  },
  created () {
    let id = this.$route.params.id;
    this.$store.dispatch('posts/getPost', id);
  },
  destroyed () {
    this.$store.commit('posts/clearPost')
  },
}
</script>

<style>
  
</style>