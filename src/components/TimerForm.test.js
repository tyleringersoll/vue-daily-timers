import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TimerForm from "./TimerForm.vue";

describe("TimerForm", () => {
  test("emits add-timer event with correct data when form is submitted", async () => {
    const wrapper = mount(TimerForm);

    await wrapper.find('input[type="text"]').setValue("Test Timer");
    await wrapper.find('input[type="number"]').setValue("15");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("add-timer")).toBeTruthy();
    expect(wrapper.emitted("add-timer")[0][0]).toEqual({
      name: "Test Timer",
      minutes: 15,
    });
    expect(wrapper.vm.newTimerName).toBe("");
    expect(wrapper.vm.newTimerMinutes).toBeNull();
  });
});
