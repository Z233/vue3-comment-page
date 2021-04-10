<template>
  <CommentForm/>
  <CommentList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommentForm from './components/CommentForm.vue';
import CommentList from './components/CommentList.vue';

export default defineComponent({
  name: 'App',
  components: {
    CommentForm,
    CommentList
  }
})
</script>