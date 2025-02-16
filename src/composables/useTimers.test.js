import { describe, test, expect, beforeEach, vi } from "vitest";
import { useTimers } from "./useTimers";

vi.mock("../../../src/composables/useAudio", () => ({
  useAudio: () => ({
    playSound: vi.fn(),
  }),
}));

vi.mock("../../../src/composables/useNotification", () => ({
  useNotification: () => ({
    sendNotification: vi.fn(),
  }),
}));

describe("useTimers", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("addTimer creates a new timer with correct properties", () => {
    const { timers, addTimer } = useTimers();

    addTimer("Test Timer", 10);

    expect(timers.value).toHaveLength(1);
    expect(timers.value[0]).toMatchObject({
      name: "Test Timer",
      minutes: 10,
      remaining: 600,
      isRunning: true,
    });
  });

  test("deleteTimer removes the timer", () => {
    const { timers, addTimer, deleteTimer } = useTimers();

    addTimer("Test Timer");
    const timer = timers.value[0];

    deleteTimer(timer);
    expect(timers.value).toHaveLength(0);
  });

  test("formatTime correctly formats seconds", () => {
    const { formatTime } = useTimers();

    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(3600)).toBe("60:00");
  });
});
