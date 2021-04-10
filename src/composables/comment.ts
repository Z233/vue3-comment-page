import { useStore } from '../store';
import { Comment } from '../type';

export function hasComment() {
  return !!window.localStorage.getItem('comment');
}

export function useComment() {
  const store = useStore();

  if (hasComment()) {
    const commentArray = JSON.parse(window.localStorage.getItem('comment')!);
    store.commit('syncComment', { commentArray });
  } else {
    const newCommentArray = new Array();
    window.localStorage.setItem('comment', JSON.stringify(newCommentArray));
    store.commit('syncComment', { commentArray: newCommentArray });
  }

}

export function saveComment(commentArray: Comment[]) {
  window.localStorage.setItem('comment', JSON.stringify(commentArray));
}
