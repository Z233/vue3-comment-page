<template>
  <div class="mt-5 max-w-full">
    <div class="flex space-x-5">
      <Avatar :imgurl="comment.imgurl"/>
      <div class="max-w-full-calc space-y-5">
        <div class="comment bg-white text-primary p-4 rounded-md relative shadow-md">
          <p class="break-words">{{ comment.content }}</p>
          <div class="flex justify-between mt-3 text-xs text-gray-400 space-x-3 md:space-x-16">
            <span>{{ comment.name }} | {{ new Date(comment.time * 1000).toLocaleString() }}</span>
            <div>
              <span @click="deleteComment(comment.id)" class="hover:text-gray-600 cursor-pointer">Delete</span>
              |
              <span
                @click="$emit('clickOnReply', !replyFormVis)" 
                class="hover:text-gray-600 cursor-pointer">Reply</span>
            </div>
          </div>
        </div>
        <CommentReply 
          v-for="reply in comment.replies" 
          :key="reply.id"
          :reply="reply" 
          :commentId="comment.id"
          @clickOnSonReply="clickOnSonReply($event)"/>
        <CommentReplyForm 
          v-if="replyFormVis" 
          :show="replyFormVis" 
          :commentId="comment.id"
          :initialContent="replyContent"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from '../store'; 
import { Comment } from '../type';
import Avatar from './CommentAvatar.vue';
import CommentReply from './CommentReply.vue';
import CommentReplyForm from './CommentReplyForm.vue';

export default defineComponent({
  components: {
    Avatar,
    CommentReply,
    CommentReplyForm
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    },
    replyFormVis: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const replyContent = ref('');

    return {
      replyContent,
      deleteComment(id: string) {
        store.commit('deleteComment', { id });
      },
      clickOnSonReply(name: string) {
        emit('clickOnReply', !props.replyFormVis);
        replyContent.value = `@${name}: `;
      }
    }
  }
})
</script>
