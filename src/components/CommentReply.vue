<template>
  <div class="flex space-x-5">
    <Avatar :size="10" :imgurl="reply.imgurl"/>
    <div class="reply bg-white flex flex-col p-3 rounded-md relative shadow-sm">
      <p class="text-primary">{{ reply.content }}</p>
      <div class="flex justify-between mt-2 text-xs text-gray-400 space-x-3 md:space-x-16">
        <span>{{ reply.name }} | {{ time }}</span>
        <div>
          <span @click="deleteReply(reply.id, commentId)" class="hover:text-gray-600 cursor-pointer">Delete</span>
          |
          <span @click="$emit('clickOnSonReply', reply.name)" class="hover:text-gray-600 cursor-pointer">Reply</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Avatar from '../components/CommentAvatar.vue';
import formatTime from '../composables/formatTime';
import { useStore } from '../store';
import { Comment } from '../type';

export default defineComponent({
  components: {
    Avatar
  },
  props: {
    reply: {
      type: Object as PropType<Comment>,
      required: true
    },
    commentId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    return {
      imgurl: computed(() => store.state.user.imgurl),
      deleteReply: (replyId: string, commentId: string) => store.commit('deleteReply', { replyId, commentId }),
      time: formatTime(props.reply.time)
    }
  },
})
</script>
