export function useAudio(audioSrc = "alert.mp3") {
  const audio = new Audio(audioSrc);
  audio.volume = 1.0;

  const playSound = async () => {
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.warn("Audio playback failed:", error);
      try {
        const fallbackAudio = new Audio(audioSrc);
        await fallbackAudio.play();
      } catch (fallbackError) {
        console.warn("Fallback audio failed:", fallbackError);
      }
    }
  };

  return { playSound };
}
