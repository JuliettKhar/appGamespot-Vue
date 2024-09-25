<template>
  <div class="container">
    <div class="home_container">
      <md-card v-for="(post, index) in posts" :key="index">
          <md-card-media md-ratio="4:3">
            <img :src="post.img" alt="" />
          </md-card-media>
        <md-card-header>
          <h2 class="md-title">{{post.title}}</h2>
          <div class="md-subhead">
            {{post.desc}}
          </div>
        </md-card-header>
        <md-card-actions>
          <Btn type="link" :linkTo="`/post/${post.id}`" :addClass="['small_link']">See review</Btn>
        </md-card-actions>
      </md-card>
    </div>
    <div class="load_more">
      <Btn type="btn" :addClass="['small_link']" :action="loadMore">
        Load more
      </Btn>
    </div>
  </div>
</template>
<script>
//  import posts from '../../assets/posts.js';
import Btn  from '../UI/UiBuutton.vue';
export default {
 data () {
   return {
    
   }
 },
 components: {
   Btn
 },
 computed: {
   posts () {
     return this.$store.getters['posts/getPosts'];
   }
 },
 methods: {
  loadMore () {
    this.$store.dispatch('posts/getAllPosts', {
      limit: this.posts.length + 3
    });
   }
 },
 created() {
   this.$store.dispatch('posts/getAllPosts', {
     limit: 3
   });
 },
}
</script>