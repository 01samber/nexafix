/**
 * Plays a subtle mechanical tap sound (hammer/screw) using Web Audio API.
 * Used when swiping or tapping to navigate on mobile.
 */
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) audioContext = new Ctx();
  }
  return audioContext;
}

export function playTapSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const dur = 0.04;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + dur);
    osc.type = "sine";

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.start(now);
    osc.stop(now + dur);
  } catch {
    // Ignore (e.g. autoplay restrictions)
  }
}
