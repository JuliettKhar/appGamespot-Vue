<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Rating</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>
      <md-table-row v-for="(post, index) in posts" :key="index">
        <md-table-cell>{{post.title}}</md-table-cell>
        <md-table-cell>{{post.desc}}</md-table-cell>
        <md-table-cell>{{post.rating}}</md-table-cell>
        <md-table-cell>
          <div class="post_delete" @click="deleteHandler(post.id)">Delete</div>
        </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  computed: {
    posts () {
      let posts = this.$store.getters['admin/getAdminPost'];
      return posts;
    }
  },
  methods: {
    deleteHandler (id) {}
  },
  created () {
    this.$store.dispatch('admin/getAdminPosts');
  }
}
</script>