<template>
  <div class="mt-5 max-w-full">
    <div class="flex space-x-5">
      <Avatar :imgurl="imgurl"/>
      <div class="max-w-full-calc space-y-5">
        <div class="comment bg-white text-primary p-4 rounded-md relative shadow-md">
          <p class="break-words">{{ content }}</p>
          <div class="flex justify-between mt-3 text-xs text-gray-400 space-x-3 md:space-x-16">
            <span>{{ name }} | {{ new Date(time * 1000).toLocaleString() }}</span>
            <div>
              <span @click="deleteComment(id)" class="hover:text-gray-600 cursor-pointer">Delete</span>
              |
              <span
                @click="$emit('clickOnReply', !replyFormVis)" 
                class="hover:text-gray-600 cursor-pointer">Reply</span>
            </div>
          </div>
        </div>
        <CommentReply/>
        <CommentReplyForm v-if="replyFormVis"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useStore } from '../store'; 
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
    name: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    imgurl: {
      type: String,
      required: true
    },
    replyFormVis: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore();

    return {
      deleteComment(id: string) {
        store.commit('deleteComment', { id });
      }
    }
  }
})
</script>
