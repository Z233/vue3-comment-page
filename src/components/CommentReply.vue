<template>
  <div class="flex space-x-5">
    <Avatar :size="10" :imgurl="imgurl"/>
    <div class="reply bg-white flex flex-col p-3 rounded-md relative shadow-sm">
      <p class="text-primary">There are replies.</p>
      <div class="flex justify-between mt-2 text-xs text-gray-400 space-x-3 md:space-x-16">
        <span>Hello | {{ new Date(time * 1000).toLocaleString() }}</span>
        <div>
          <span @click="deleteComment(id)" class="hover:text-gray-600 cursor-pointer">Delete</span>
          |
          <span class="hover:text-gray-600 cursor-pointer">Reply</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Avatar from '../components/CommentAvatar.vue';
import { useStore } from '../store';

export default defineComponent({
  components: {
    Avatar
  },
  setup() {
    const store = useStore();

    return {
      imgurl: computed(() => store.state.user.imgurl)
    }
  },
})
</script>
