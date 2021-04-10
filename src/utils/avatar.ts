import { getData } from '../utils/http';

export async function fetchAvatar() {
  return await getData();
}