import { store } from '../store';
import { Comment } from '../type';
import getShortid from '../utils/shortid';

export function hasComment() {
  return !!window.localStorage.getItem('comment');
}

export function useComment() {
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

// const comment: Comment = {
//   name: name.value,
//   content: content.value,
//   id: getShortid(),
//   time: parseInt((Date.now() / 1000).toString(), 10),
//   imgurl: imgurl.value,
// };

export function createComment(content: string) {
  const { name, imgurl } = store.state.user;

  return {
    name,
    content,
    imgurl,
    id: getShortid(),
    time: parseInt((Date.now() / 1000).toString(), 10),
    replies: []
  } as Comment;
}