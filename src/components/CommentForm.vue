<template>
  <div class="flex space-x-5">
    <Avatar ref="avatarRef" :imgurl="imgurl"/>
    <div class="comment flex flex-col flex-wrap-reverse w-full max-w-full-calc" @keypress.enter="addComment() || resetForm()">
      <textarea v-model="content" class="w-full shadow-md rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Add comment..." id="" cols="30" rows="5"></textarea>
      <div class="flex justify-between">
        <input v-model="name" class="shadow-md mt-5 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Your name">
        <button @click="addComment() || resetForm()" class="mt-5 w-32 bg-primary text-white p-2 rounded-lg shadow-lg transition transform hover:scale-110 flex">
          <span class="text-center flex-grow">Add comment</span>
        </button>
      </div>
      <div class="w-full border-b-2 border-gray-300 mt-6"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Avatar from './CommentAvatar.vue';
import { useStore } from '../store';
import { Comment } from '../type';
import getShortid from '../utils/shortid';

export default defineComponent({
  components: {
    Avatar
  },
  setup() {
    const store = useStore();
    const name = ref('');
    const content = ref('');
    const avatarRef = ref(null);
    
    const imgurl = computed(() => store.state.user.imgurl);

    onMounted(() => {
      store.commit('setRandomUser');
      name.value = store.state.user.name;      
    });

    return {
      avatarRef,
      name,
      imgurl,
      content,
      addComment: () => {
        const comment: Comment = {
          name: name.value,
          content: content.value,
          id: getShortid(),
          time: parseInt((Date.now() / 1000).toString(), 10),
          imgurl: imgurl.value,
        };

        store.commit('addComment', { comment });
      },
      resetForm: () => {
        content.value = '';
      }
    }
  },
})
</script>
