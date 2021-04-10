<template>
  <div class="pl-20 mt-5 flex space-x-5">
    <Avatar :size="10" :imgurl="imgurl"/>
    <div class="reply bg-white flex items-center px-3 rounded-md relative shadow-sm">
      <p class="text-primary">There are replies</p>
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
