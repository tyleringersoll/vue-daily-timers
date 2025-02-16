import { ref, watch } from "vue";
import { SCHEDULE_KEY, DEFAULT_TIMEZONE, DEFAULT_SCHEDULE } from "../constants";

export function useSchedule() {
  const scheduleStart = ref(DEFAULT_SCHEDULE.start);
  const scheduleEnd = ref(DEFAULT_SCHEDULE.end);
  const timezone = ref(DEFAULT_TIMEZONE);

  const loadSchedule = () => {
    const savedSchedule = localStorage.getItem(SCHEDULE_KEY);
    if (savedSchedule) {
      const schedule = JSON.parse(savedSchedule);
      scheduleStart.value = schedule.start;
      scheduleEnd.value = schedule.end;
      timezone.value = schedule.timezone;
    }
  };

  const saveSchedule = () => {
    const schedule = {
      start: scheduleStart.value,
      end: scheduleEnd.value,
      timezone: timezone.value,
    };
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  };

  const isWithinSchedule = () => {
    const now = new Date();
    const tzNow = new Date(
      now.toLocaleString("en-US", { timeZone: timezone.value })
    );

    const [startHour, startMinute] = scheduleStart.value.split(":").map(Number);
    const [endHour, endMinute] = scheduleEnd.value.split(":").map(Number);

    const startTime = new Date(tzNow);
    startTime.setHours(startHour, startMinute, 0);

    const endTime = new Date(tzNow);
    endTime.setHours(endHour, endMinute, 0);

    return tzNow >= startTime && tzNow < endTime;
  };

  watch([scheduleStart, scheduleEnd, timezone], saveSchedule);

  return {
    scheduleStart,
    scheduleEnd,
    timezone,
    loadSchedule,
    saveSchedule,
    isWithinSchedule,
  };
}
