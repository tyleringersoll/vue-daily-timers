import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import App from "./App.vue";

// Create mock functions
const mockLoadSchedule = vi.fn();
const mockIsWithinSchedule = vi.fn().mockReturnValue(true);
const mockLoadTimers = vi.fn();
const mockAddTimer = vi.fn();
const mockStartTimer = vi.fn();
const mockPauseTimer = vi.fn();
const mockFormatTime = vi.fn();

// Create mock timer data
const mockTimersRef = ref([
  { id: 1, name: "Test Timer", isRunning: true, intervalId: null },
]);

// Mock the composables
vi.mock("./composables/useSchedule", () => ({
  useSchedule: vi.fn(() => ({
    scheduleStart: ref("09:00"),
    scheduleEnd: ref("17:00"),
    timezone: "EST",
    loadSchedule: mockLoadSchedule,
    isWithinSchedule: mockIsWithinSchedule,
  })),
}));

vi.mock("./composables/useTimers", () => ({
  useTimers: vi.fn(() => ({
    timers: mockTimersRef,
    addTimer: mockAddTimer,
    startTimer: mockStartTimer,
    pauseTimer: mockPauseTimer,
    restartTimer: vi.fn(),
    deleteTimer: vi.fn(),
    formatTime: mockFormatTime,
    loadTimers: mockLoadTimers,
  })),
}));

// Add component stubs with default props
const stubs = {
  TimerList: {
    name: "TimerList",
    template: '<div class="timer-list"></div>',
    props: {
      timers: {
        type: Array,
        default: () => [],
      },
      formatTime: {
        type: Function,
        default: () => {},
      },
    },
  },
  TimerForm: {
    name: "TimerForm",
    template: '<div class="timer-form"></div>',
    emits: ["add-timer"],
  },
  ScheduleSettings: {
    name: "ScheduleSettings",
    template: '<div class="schedule-settings"></div>',
    props: {
      scheduleStart: String,
      scheduleEnd: String,
    },
  },
};

describe("App.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    // Reset the mock timers ref
    mockTimersRef.value = [
      { id: 1, name: "Test Timer", isRunning: true, intervalId: null },
    ];
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("initializes timers and schedule on mount", async () => {
    const wrapper = mount(App, {
      global: {
        stubs,
      },
    });
    await wrapper.vm.$nextTick();

    expect(mockLoadSchedule).toHaveBeenCalled();
    expect(mockLoadTimers).toHaveBeenCalled();
  });

  it("starts schedule check interval on mount", async () => {
    const wrapper = mount(App, {
      global: {
        stubs,
      },
    });
    await wrapper.vm.$nextTick();
    vi.advanceTimersByTime(60000);

    expect(mockIsWithinSchedule).toHaveBeenCalled();
    expect(mockStartTimer).toHaveBeenCalled();
  });

  it("handles adding new timer", async () => {
    const wrapper = mount(App, {
      global: {
        stubs,
      },
    });
    await wrapper.vm.$nextTick();

    const timerForm = wrapper.findComponent(stubs.TimerForm);
    expect(timerForm.exists()).toBe(true); // Add this assertion to debug

    await timerForm.vm.$emit("add-timer", {
      name: "Test Timer",
      minutes: 30,
    });

    expect(mockAddTimer).toHaveBeenCalledWith("Test Timer", 30);
  });

  it("cleans up intervals on unmount", async () => {
    const wrapper = mount(App, {
      global: {
        stubs,
      },
    });
    await wrapper.vm.$nextTick();

    wrapper.unmount();

    expect(mockPauseTimer).toHaveBeenCalled();
  });
});
