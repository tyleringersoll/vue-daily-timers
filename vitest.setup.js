import { vi } from "vitest";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock window.Notification
global.Notification = {
  permission: "granted",
  requestPermission: vi.fn().mockResolvedValue("granted"),
};
