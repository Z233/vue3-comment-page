<template>
  <transition-group
    name="fade">
    <Comment 
      v-for="(comment, idx) in commentArray"
      :key="comment.id"
      :name="comment.name"
      :time="comment.time"
      :content="comment.content"
      :id="comment.id"
      :imgurl="comment.imgurl"
      :replyFormVis="replyFormVisArr[idx]"
      @clickOnReply="toggleReplyForm($event, idx)">
    </Comment>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref } from 'vue';
import Comment from './Comment.vue';
import { useComment } from '../composables/comment';
import { useStore } from '../store';

export default defineComponent({
  components: {
    Comment
  },
  setup() {
    const store = useStore();
    const commentArray = computed(() => store.state.commentArray);
    const replyFormVisArr = ref();

    watch(commentArray, () => {  
      replyFormVisArr.value = commentArray.value.map(() => false);      
    });

    onMounted(() => {
      useComment();
    });

    return {
      commentArray,
      replyFormVisArr,
      toggleReplyForm: (vis: boolean, idx: number) => {  
        const arr = replyFormVisArr.value as Array<boolean>;
        arr.forEach((e, i) => {
          arr[i] = idx === i ? vis: false;
        });
      }
    }
  }
})
</script>

<style scoped>
  .fade-enter-active {
    transition: all .5s ease-in-out;
  }

  .fade-leave-active {
    transition: all .25s ease;
    position: absolute;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-move {
    transition: transform 0.5s ease;
  }
</style>