import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAudio } from "./useAudio";

describe("useAudio", () => {
  let mockAudio;

  beforeEach(() => {
    mockAudio = {
      play: vi.fn().mockResolvedValue(undefined),
      currentTime: 0,
      volume: 1.0,
    };

    global.Audio = vi.fn().mockImplementation(() => mockAudio);
    console.warn = vi.fn();
  });

  it("should create an Audio instance with default sound file", () => {
    useAudio();
    expect(global.Audio).toHaveBeenCalledWith("alert.mp3");
  });

  it("should create an Audio instance with custom sound file", () => {
    useAudio("custom.mp3");
    expect(global.Audio).toHaveBeenCalledWith("custom.mp3");
  });

  it("should play sound successfully", async () => {
    const { playSound } = useAudio();
    await playSound();

    expect(mockAudio.currentTime).toBe(0);
    expect(mockAudio.play).toHaveBeenCalled();
  });

  it("should attempt fallback when primary audio fails", async () => {
    mockAudio.play.mockRejectedValueOnce(new Error("Audio failed"));

    const { playSound } = useAudio();
    await playSound();

    expect(console.warn).toHaveBeenCalledWith(
      "Audio playback failed:",
      expect.any(Error)
    );
    expect(global.Audio).toHaveBeenCalledTimes(2);
  });

  it("should handle both primary and fallback failures", async () => {
    mockAudio.play.mockRejectedValue(new Error("Audio failed"));

    const { playSound } = useAudio();
    await playSound();

    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledWith(
      "Audio playback failed:",
      expect.any(Error)
    );
    expect(console.warn).toHaveBeenCalledWith(
      "Fallback audio failed:",
      expect.any(Error)
    );
  });
});
