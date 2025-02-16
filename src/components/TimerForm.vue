<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-timer"]);

const newTimerName = ref("");
const newTimerMinutes = ref(null);

const handleSubmit = () => {
  if (!newTimerName.value) return;

  emit("add-timer", {
    name: newTimerName.value,
    minutes: newTimerMinutes.value > 0 ? newTimerMinutes.value : 5,
  });

  newTimerName.value = "";
  newTimerMinutes.value = null;
};
</script>

<template>
  <div class="mb-6 p-4 bg-gray-100 rounded">
    <h2 class="text-lg font-semibold mb-2">Add New Timer</h2>
    <div class="flex gap-4">
      <input
        v-model="newTimerName"
        type="text"
        placeholder="Timer name"
        class="px-2 py-1 border rounded"
      />
      <input
        v-model="newTimerMinutes"
        type="number"
        min="1"
        placeholder="Minutes (default 5)"
        class="px-2 py-1 border rounded w-24"
      />
      <button
        @click="handleSubmit"
        class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Timer
      </button>
    </div>
  </div>
</template>
