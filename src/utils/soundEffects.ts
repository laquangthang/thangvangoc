// Web Audio synthesizer for cute romantic micro-interactions (no external audio files needed)

class RomanticSound {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft sweet chime when a heart or favorite is clicked
  playHeartChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.3); // D6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Audio autoplay policy
    }
  }

  // Play celebration harp chime when bucket item is completed or surprise is opened
  playCelebration() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.15, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.5);
      });
    } catch {
      // ignore
    }
  }

  // Romantic gentle ambient melody loop (soft music box vibe)
  toggleBgm(onStateChange?: (playing: boolean) => void) {
    if (this.isBgmPlaying) {
      this.stopBgm();
      onStateChange?.(false);
      return false;
    } else {
      this.startBgm();
      onStateChange?.(true);
      return true;
    }
  }

  private startBgm() {
    try {
      this.init();
      this.isBgmPlaying = true;
      // Romantic music box melody (Canon in D snippet)
      const melody = [
        { f: 587.33, d: 0.4 }, // D5
        { f: 440.0, d: 0.4 },  // A4
        { f: 493.88, d: 0.4 }, // B4
        { f: 369.99, d: 0.4 }, // F#4
        { f: 392.0, d: 0.4 },  // G4
        { f: 293.66, d: 0.4 }, // D4
        { f: 392.0, d: 0.4 },  // G4
        { f: 440.0, d: 0.4 },  // A4
      ];
      let step = 0;

      const playNext = () => {
        if (!this.isBgmPlaying || !this.ctx) return;
        const item = melody[step % melody.length];
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.f, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.d * 1.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + item.d * 1.5);

        step++;
        this.bgmTimer = window.setTimeout(playNext, 750);
      };

      playNext();
    } catch {
      this.isBgmPlaying = false;
    }
  }

  private stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  getIsBgmPlaying() {
    return this.isBgmPlaying;
  }
}

export const soundFx = new RomanticSound();
