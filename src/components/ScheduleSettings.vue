<script setup>
const props = defineProps({
  scheduleStart: String,
  scheduleEnd: String,
});

const emit = defineEmits(["update:scheduleStart", "update:scheduleEnd"]);
</script>

<template>
  <div class="mb-6 p-4 bg-blue-50 rounded">
    <h2 class="text-lg font-semibold mb-2">Active Timer Schedule (EST)</h2>
    <div class="flex gap-4 items-center">
      <div>
        <label class="block text-sm text-gray-600">Start Time</label>
        <input
          :value="scheduleStart"
          @input="$emit('update:scheduleStart', $event.target.value)"
          type="time"
          class="px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600">End Time</label>
        <input
          :value="scheduleEnd"
          @input="$emit('update:scheduleEnd', $event.target.value)"
          type="time"
          class="px-2 py-1 border rounded"
        />
      </div>
    </div>
  </div>
</template>
