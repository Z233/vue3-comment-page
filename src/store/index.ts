import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { Comment } from '../type';
import { saveComment } from '../composables/comment';
import getRandomName from '../utils/uniqueName';
import { fetchAvatar } from '../utils/avatar';

export interface State {
  user: {
    name: string,
    imgurl: string
  },
  commentArray: Array<Comment>,
  replyFormVis: boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  user: {
    name: '',
    imgurl: ''
  },
  commentArray: [] as Array<Comment>,
  replyFormVis: false
};

const mutations = {
  setRandomUser(state: State) {
    state.user.name = getRandomName();
    fetchAvatar().then(res => {
      state.user.imgurl = res.imgurl;
    });
  },
  addComment(state: State, { comment }: { comment: Comment }) {
    state.commentArray.unshift(comment);
    saveComment(state.commentArray);
  },
  deleteComment(state: State, { id }: { id: string }) {
    state.commentArray = state.commentArray.filter(comment => comment.id !== id);
    saveComment(state.commentArray);
  },
  syncComment(state: State, { commentArray }: { commentArray: Array<Comment> }) {
    state.commentArray = commentArray;
  }
};

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore({
  state,
  mutations
});