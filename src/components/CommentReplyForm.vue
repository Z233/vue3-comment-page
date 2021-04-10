<template>
  <div class="flex space-x-3 w-full">
    <Avatar :imgurl="user.imgurl" :size="10"/>
    <div class="bg-gray-300 rounded-md flex shadow-md">
      <div class="py-2 pl-4 pr-3">
        <input ref="input" @keypress.enter="addReply" v-model="content" type="text" placeholder="Reply..." class="bg-transparent h-full focus:outline-none">
      </div>
      <button @click="addReply" class="bg-primary hover:bg-primary-light transition text-white py-2 px-4 rounded-md">
        <span>Reply</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { createComment } from '../composables/comment';
import { useStore } from '../store'
import Avatar from './CommentAvatar.vue';
import emitter from '../utils/mitt';

export default defineComponent({
  components: {
    Avatar
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    commentId: {
      type: String,
      required: true
    },
    initialContent: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const input = ref(null);
    const content = ref(props.initialContent);
    const { show } = toRefs(props);

    onMounted(() => {
      (input.value! as HTMLElement).focus();
    });

    return {
      input,
      content,
      user: computed(() => store.state.user),
      addReply: () => {
        const reply = createComment(content.value);
        store.commit('addReply', { reply, id: props.commentId });
        content.value = '';
        emitter.emit('replyFinished');
      }
    }
  },
})
</script>
