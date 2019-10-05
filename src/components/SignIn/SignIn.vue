<template>
  <div class="container">
    <div class="signin_container">
      <h1>Sign in</h1>
      <form action="" @submit.prevent="onSubmit">
        <div class="input_field">
          <label for="mail">Email</label>
          <input type="email" name="mail" id="mail" v-model="formData.email"/>
        </div>
        <div class="input_field">
          <label for="psw">Password</label>
          <input type="password" name="psw" id="psw" v-model="formData.password"/>
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        email: 'admin@gmail.com',
        password: 'admin123'
      }
    }
  }, 
  methods: {
    onSubmit () {
      this.$store.dispatch('admin/signIn', this.formData);
    }
  }
}
</script>