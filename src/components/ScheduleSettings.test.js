import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ScheduleSettings from "./ScheduleSettings.vue";

describe("ScheduleSettings", () => {
  const defaultProps = {
    scheduleStart: "09:00",
    scheduleEnd: "17:00",
  };

  it("renders properly with default props", () => {
    const wrapper = mount(ScheduleSettings, {
      props: defaultProps,
    });

    expect(wrapper.find("h2").text()).toBe("Active Timer Schedule (EST)");
    expect(wrapper.findAll('input[type="time"]')).toHaveLength(2);
  });

  it("displays provided schedule times", () => {
    const wrapper = mount(ScheduleSettings, {
      props: defaultProps,
    });

    const [startInput, endInput] = wrapper.findAll('input[type="time"]');
    expect(startInput.element.value).toBe("09:00");
    expect(endInput.element.value).toBe("17:00");
  });

  it("emits update event when start time changes", async () => {
    const wrapper = mount(ScheduleSettings, {
      props: defaultProps,
    });

    const startInput = wrapper.findAll('input[type="time"]')[0];
    await startInput.setValue("10:00");

    expect(wrapper.emitted("update:scheduleStart")).toBeTruthy();
    expect(wrapper.emitted("update:scheduleStart")[0]).toEqual(["10:00"]);
  });

  it("emits update event when end time changes", async () => {
    const wrapper = mount(ScheduleSettings, {
      props: defaultProps,
    });

    const endInput = wrapper.findAll('input[type="time"]')[1];
    await endInput.setValue("18:00");

    expect(wrapper.emitted("update:scheduleEnd")).toBeTruthy();
    expect(wrapper.emitted("update:scheduleEnd")[0]).toEqual(["18:00"]);
  });
});
