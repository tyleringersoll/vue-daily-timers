import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TimerList from "./TimerList.vue";

describe("TimerList", () => {
  const mockTimers = [
    {
      id: 1,
      name: "Test Timer",
      minutes: 5,
      remaining: 300,
      isRunning: false,
    },
  ];

  const mockFormatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  test("renders timer list correctly", () => {
    const wrapper = mount(TimerList, {
      props: {
        timers: mockTimers,
        formatTime: mockFormatTime,
      },
    });

    expect(wrapper.text()).toContain("Test Timer");
    expect(wrapper.text()).toContain("5:00");
  });

  test("emits correct events when buttons are clicked", async () => {
    const wrapper = mount(TimerList, {
      props: {
        timers: mockTimers,
        formatTime: mockFormatTime,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("start-timer")).toBeTruthy();
    expect(wrapper.emitted("start-timer")[0][0]).toEqual(mockTimers[0]);
  });
});
