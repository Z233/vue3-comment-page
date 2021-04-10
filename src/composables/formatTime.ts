import { computed } from "@vue/runtime-core";
import dayjs from '../utils/dayjs';

export default function formatTime(unixTime: number) {
  const day = dayjs.unix(unixTime);

  return computed(() => {
    return day.isToday() ? day.format('HH:mm:ss') : day.format('YYYY-MM-DD HH:mm:ss');
  });
}