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
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
  data () {
    return {
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
        maxLength: maxLength(6),
      },
      rating: {
        required,
      }
    }
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
