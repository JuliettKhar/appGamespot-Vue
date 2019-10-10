<template>
  <div class="dashboard_form">
    <h1>Add posts</h1>
    <form  @submit.prevent="submitHandler">
      <div 
        class="input_field"
        :class="{invalid: $v.formdata.title.$error}"
      >
        <label for="">Title</label>
        <input 
          type="text" 
          v-model.trim="formdata.title"
          @blur="$v.formdata.title.$touch()"
        />
        <p class="error_label" v-if="$v.formdata.title.$error">This input is required</p>
      </div>
      <div 
        class="input_field"
        :class="{invalid: $v.formdata.desc.$error}"
      >
        <label for="">Description</label>
        <input 
          type="text" 
          v-model.trim="formdata.desc"
          @blur="$v.formdata.desc.$touch()"
        />
        <p class="error_label" v-if="$v.formdata.desc.$error">This input is required</p>
         <p class="error_label" v-if="!$v.formdata.desc.maxLength">Must not be greater than {{$v.formdata.desc.$params.maxLength.max}} characters</p>
      </div>
      <div class="input_field">
        <wysiwyg 
          v-model="formdata.content"
        />
      </div>
      <div class="input_field">
        <label for="">Rating</label>
        <select name="" id=""
          v-model="formdata.rating"
          @blur="$v.formdata.rating.$touch()"
          :class="{invalid: $v.formdata.rating.$error}"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <p class="error_label" v-if="$v.formdata.rating.$error">You need to select rating</p>
      <button type="submit" @click="submitHandler">Add post</button>
    </form>
    <md-dialog :md-active="dialog">
      <p>Your post hasn't content. Are you sure?</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogOnCancel">Oops, I want to add it</md-button>
        <md-button class="md-danger" @click="dialogOnConfirm">Yes, I am sure</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      dialog: false,
      formdata: {
        title: '',
        desc: '',
        content: '',
        rating: '',
      }
    }
  }, 
  validations: {
    formdata: {
      title: {
        required,
      },
      desc: {
        required,
        maxLength: maxLength(100),
      },
      rating: {
        required,
      }
    }
  },
  methods: {
    submitHandler() {
      if (!this.$v.$invalid) {
          if (this.formdata.content === '') {
           this.dialog = true; 
          } else {
            this.addPost();
          }
      } else {
        alert('smth wrong');
      }
    },
    addPost () {

    },
    dialogOnCancel () {
      this.dialog = false;
    },
    dialogOnConfirm () {
      this.dialog = false;
      this.addPost();
    },

  },
}
</script>


<style >
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.input_field .invalid input,
.input_field .invalid select {
  border: 1px solid red;
}
</style>
