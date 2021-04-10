import { fetchAvatar } from '../utils/avatar';
import { ref } from 'vue';

export default function() {
  const avatar = ref({ imgurl: '' });
  const getAvatar = async () => {
    avatar.value = await fetchAvatar();
  };
  getAvatar();

  return avatar;
}