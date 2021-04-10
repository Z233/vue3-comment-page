<template>
  <div class="flex space-x-3 w-full">
    <Avatar :imgurl="user.imgurl" :size="10"/>
    <div class="bg-gray-300 rounded-3xl flex shadow-md">
      <div class="py-2 pl-4 pr-3">
        <input type="text" placeholder="Reply..." class="bg-transparent h-full focus:outline-none">
      </div>
      <button class="bg-primary hover:bg-primary-light transition text-white py-2 px-4 rounded-3xl">
        <span>Reply</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../store'
import Avatar from './CommentAvatar.vue';

export default defineComponent({
  components: {
    Avatar
  },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user)
    }
  },
})
</script>
