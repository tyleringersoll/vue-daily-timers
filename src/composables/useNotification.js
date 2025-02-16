export function useNotification() {
  const initialize = async () => {
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
  };

  initialize();

  const sendNotification = (title, options = {}) => {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    new Notification(title, {
      icon: "/timer-icon.png",
      requireInteraction: true,
      ...options,
    });
  };

  return { sendNotification };
}
