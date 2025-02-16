<script setup>
const props = defineProps({
  timers: {
    type: Array,
    required: true,
  },
  formatTime: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits([
  "start-timer",
  "pause-timer",
  "restart-timer",
  "delete-timer",
]);
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Active Timers</h2>
    <div
      v-for="timer in timers"
      :key="timer.id"
      class="p-4 border rounded flex items-center justify-between"
      :class="{ 'bg-green-50': timer.isRunning && timer.intervalId }"
    >
      <div>
        <h3 class="font-semibold">{{ timer.name }}</h3>
        <p class="text-2xl font-mono">{{ formatTime(timer.remaining) }}</p>
      </div>

      <div class="space-x-2">
        <button
          v-if="!timer.isRunning"
          @click="$emit('start-timer', timer)"
          class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          v-else
          @click="$emit('pause-timer', timer)"
          class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          @click="$emit('restart-timer', timer)"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart
        </button>
        <button
          @click="$emit('delete-timer', timer)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
