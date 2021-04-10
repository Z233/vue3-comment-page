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
    state.commentArray = [comment, ...state.commentArray];
    saveComment(state.commentArray);
  },
  deleteComment(state: State, { id }: { id: string }) {
    state.commentArray = state.commentArray.filter(comment => comment.id !== id);
    saveComment(state.commentArray);
  },
  syncComment(state: State, { commentArray }: { commentArray: Array<Comment> }) {
    state.commentArray = commentArray;
  },
  addReply(state: State, payload: { reply: Comment, id: string }) {
    const { reply, id } = payload;
    const tarIdx = state.commentArray.findIndex(c => c.id === id);
    state.commentArray[tarIdx].replies.unshift(reply);
    saveComment(state.commentArray);
  },
  deleteReply(state: State, payload: { replyId: string, commentId: string }) {
    const { replyId, commentId } = payload;
    const tarCommentIdx = state.commentArray.findIndex(c => c.id === commentId);
    state.commentArray[tarCommentIdx].replies = state.commentArray[tarCommentIdx].replies.filter(r => r.id !== replyId);
    saveComment(state.commentArray);
  }
};

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore({
  state,
  mutations
});