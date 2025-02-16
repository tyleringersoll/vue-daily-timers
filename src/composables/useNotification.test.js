import { describe, it, expect, vi, beforeEach } from "vitest";
import { useNotification } from "./useNotification";

describe("useNotification", () => {
  beforeEach(() => {
    const NotificationMock = vi.fn();
    NotificationMock.permission = "granted";
    NotificationMock.requestPermission = vi.fn().mockResolvedValue("granted");

    global.Notification = NotificationMock;
    global.window = {
      Notification: global.Notification,
    };
  });

  it("should request notification permission on initialization", () => {
    useNotification();
    expect(Notification.requestPermission).toHaveBeenCalled();
  });

  it("should send notification with default options", () => {
    const { sendNotification } = useNotification();
    sendNotification("Test Title");

    expect(Notification).toHaveBeenCalledWith("Test Title", {
      icon: "/timer-icon.png",
      requireInteraction: true,
    });
  });

  it("should send notification with custom options", () => {
    const { sendNotification } = useNotification();
    const customOptions = {
      body: "Test Body",
      icon: "/custom-icon.png",
    };

    sendNotification("Test Title", customOptions);

    expect(Notification).toHaveBeenCalledWith("Test Title", {
      ...customOptions,
      requireInteraction: true,
    });
  });

  it("should not send notification when permission is denied", () => {
    global.Notification.permission = "denied";
    const { sendNotification } = useNotification();

    sendNotification("Test Title");
    expect(Notification).not.toHaveBeenCalled();
  });

  it("should not crash when Notification API is not available", () => {
    delete global.window.Notification;
    const { sendNotification } = useNotification();

    expect(() => {
      useNotification();
      sendNotification("Test Title");
    }).not.toThrow();
  });
});
