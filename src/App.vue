<script setup>
import { onMounted, onUnmounted } from "vue";
import { useSchedule } from "./composables/useSchedule";
import { useTimers } from "./composables/useTimers";
import ScheduleSettings from "./components/ScheduleSettings.vue";
import TimerForm from "./components/TimerForm.vue";
import TimerList from "./components/TimerList.vue";

const { scheduleStart, scheduleEnd, timezone, loadSchedule, isWithinSchedule } =
  useSchedule();

const {
  timers,
  addTimer,
  startTimer,
  pauseTimer,
  restartTimer,
  deleteTimer,
  formatTime,
  loadTimers,
} = useTimers();

const startScheduleCheck = () => {
  const interval = setInterval(() => {
    if (isWithinSchedule()) {
      timers.value.forEach((timer) => {
        if (timer.isRunning && !timer.intervalId) {
          startTimer(timer);
        }
      });
    } else {
      timers.value.forEach((timer) => {
        if (timer.intervalId) {
          pauseTimer(timer);
        }
      });
    }
  }, 60000);

  return interval;
};

onMounted(() => {
  loadSchedule();
  loadTimers();
  const scheduleInterval = startScheduleCheck();

  if (isWithinSchedule()) {
    timers.value.forEach((timer) => {
      if (timer.isRunning && !timer.intervalId) {
        startTimer(timer);
      }
    });
  }

  onUnmounted(() => {
    clearInterval(scheduleInterval);
    timers.value.forEach(pauseTimer);
  });
});

const handleAddTimer = ({ name, minutes }) => {
  addTimer(name, minutes);
};
</script>

<template>
  <div class="min-h-screen pb-16">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Daily Repeating Timers</h1>

      <ScheduleSettings
        v-model:scheduleStart="scheduleStart"
        v-model:scheduleEnd="scheduleEnd"
      />

      <TimerForm @add-timer="handleAddTimer" />

      <TimerList
        :timers="timers"
        :formatTime="formatTime"
        @start-timer="startTimer"
        @pause-timer="pauseTimer"
        @restart-timer="restartTimer"
        @delete-timer="deleteTimer"
      />
    </div>

    <footer
      class="fixed bottom-0 left-0 w-full text-center bg-white text-sm text-gray-500 py-2 border-t border-gray-300"
    >
      &copy;{{ new Date().getFullYear() }}
      <a href="https://tyleringersoll.com">Tyler Ingersoll</a>
    </footer>
  </div>
</template>
