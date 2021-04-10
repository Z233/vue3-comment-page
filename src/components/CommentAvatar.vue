<template>
  <div class="flex-shrink-0">
    <div class="rounded-full ring-gray-100 ring-4 overflow-hidden shaodw-lg" :class="'w-' + size">
      <img class="avatar-img" :src="imgurl" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import getShortid from '../utils/shortid';

export default defineComponent({
  props: {
    imgurl: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16,
      required: false,
    }
  },
  setup(props) {
    const id = getShortid();
    let avatar = ref({ imgurl: '' });  
    
    return {
      getShortid,
      id,
      avatar
    }
  }
})
</script>
