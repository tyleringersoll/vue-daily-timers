import { onMounted } from "vue";

export function useNotification() {
  onMounted(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  });

  const sendNotification = (title, options = {}) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "/timer-icon.png",
        requireInteraction: true,
        ...options,
      });
    }
  };

  return { sendNotification };
}
