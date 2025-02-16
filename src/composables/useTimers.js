import { ref, watch } from "vue";
import { STORAGE_KEY } from "../constants";
import { useAudio } from "./useAudio";
import { useNotification } from "./useNotification";

export function useTimers() {
  const timers = ref([]);
  const { playSound } = useAudio();
  const { sendNotification } = useNotification();

  const loadTimers = () => {
    const savedTimers = localStorage.getItem(STORAGE_KEY);
    if (savedTimers) {
      timers.value = JSON.parse(savedTimers);
    }
  };

  const addTimer = (name, minutes = 5) => {
    if (!name) return;

    const timer = {
      id: Date.now(),
      name,
      minutes,
      remaining: minutes * 60,
      intervalId: null,
      isRunning: false,
    };

    timers.value.push(timer);
    startTimer(timer);
  };

  const startTimer = (timer) => {
    if (timer.intervalId) return;

    timer.isRunning = true;
    timer.intervalId = setInterval(() => {
      // Create a new reference to force reactivity
      timers.value = timers.value.map((t) => {
        if (t.id === timer.id) {
          return { ...t, remaining: t.remaining - 1 };
        }
        return t;
      });

      const currentTimer = timers.value.find((t) => t.id === timer.id);
      if (currentTimer.remaining <= 0) {
        playSound();
        sendNotification(`Timer: ${currentTimer.name}`, {
          body: "Time is up!",
        });
        alert(`Timer "${currentTimer.name}" is complete!`);
        currentTimer.remaining = currentTimer.minutes * 60;
      }
    }, 1000);
  };

  const pauseTimer = (timer) => {
    timer.isRunning = false;

    if (timer.intervalId) {
      clearInterval(timer.intervalId);
      timer.intervalId = null;
    }
  };

  const restartTimer = (timer) => {
    pauseTimer(timer);
    timer.remaining = timer.minutes * 60;
    startTimer(timer);
  };

  const deleteTimer = (timer) => {
    pauseTimer(timer);
    timers.value = timers.value.filter((t) => t.id !== timer.id);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  watch(
    timers,
    (newTimers) => {
      const timersToSave = newTimers.map((timer) => ({
        ...timer,
        intervalId: null,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timersToSave));
    },
    { deep: true }
  );

  return {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    restartTimer,
    deleteTimer,
    formatTime,
    loadTimers,
  };
}
