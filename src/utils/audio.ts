class DreamLibraryAudio {
  private ctx: AudioContext | null = null;
  private muted = false;

  private ensureContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainPeak = 0.06,
    delay = 0
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  /** Brass shopkeeper bell above the library door */
  public playDoorBell() {
    this.playTone(659.25, 0.7, 'sine', 0.055, 0); // E5
    this.playTone(987.77, 0.9, 'triangle', 0.04, 0.09); // B5
    this.playTone(1318.51, 1.1, 'sine', 0.03, 0.18); // E6
  }

  /** Soft paper turn inside the dream book */
  public playPageTurn() {
    this.playTone(280, 0.09, 'triangle', 0.025, 0);
    this.playTone(340, 0.07, 'sine', 0.02, 0.04);
  }

  /** Collecting an evidence card */
  public playEvidenceCollect() {
    this.playTone(523.25, 0.25, 'sine', 0.05, 0); // C5
    this.playTone(659.25, 0.35, 'sine', 0.045, 0.07); // E5
    this.playTone(783.99, 0.45, 'triangle', 0.04, 0.14); // G5
  }

  /** Porcelain teacup clink on desk */
  public playTeaClink() {
    this.playTone(1174.66, 0.22, 'sine', 0.035, 0); // D6
    this.playTone(1760.0, 0.18, 'sine', 0.02, 0.03); // A6
  }

  /** Gentle wooden thud when placing evidence */
  public playSlotPlace() {
    this.playTone(220, 0.12, 'triangle', 0.045, 0);
    this.playTone(440, 0.14, 'sine', 0.025, 0.02);
  }

  /** Entering the floating dream modal */
  public playMagicChime() {
    this.playTone(587.33, 0.55, 'sine', 0.035, 0); // D5
    this.playTone(880.0, 0.7, 'sine', 0.03, 0.08); // A5
    this.playTone(1174.66, 0.9, 'triangle', 0.022, 0.16); // D6
  }

  /** Warm healing chord when a guest's heart knot is untied */
  public playKnotResolved() {
    const notes = [392.0, 493.88, 587.33, 739.99, 880.0]; // G major 9
    notes.forEach((freq, idx) => {
      this.playTone(freq, 1.2, 'sine', 0.045, idx * 0.09);
    });
  }

  /** Healing silver bell melody for Arthur Summer's hidden keepsake */
  public playSilverBellMelody() {
    const melody = [
      { f: 783.99, d: 0.55, t: 0 }, // G5
      { f: 987.77, d: 0.55, t: 0.18 }, // B5
      { f: 1174.66, d: 0.65, t: 0.36 }, // D6
      { f: 1046.5, d: 0.55, t: 0.56 }, // C6
      { f: 987.77, d: 0.55, t: 0.76 }, // B5
      { f: 1318.51, d: 1.0, t: 0.96 }, // E6
    ];
    melody.forEach((n) => {
      this.playTone(n.f, n.d, 'sine', 0.04, n.t);
      this.playTone(n.f * 2, n.d * 0.6, 'triangle', 0.012, n.t);
    });
  }

  /** Haunting minor dissonance when triggering a dream curse / bad ending */
  public playBadEndingDissonance() {
    this.playTone(196.0, 0.9, 'triangle', 0.045, 0); // G3
    this.playTone(233.08, 0.9, 'sine', 0.04, 0.08); // Bb3
    this.playTone(277.18, 1.0, 'triangle', 0.035, 0.18); // C#4
  }

  /** Gentle nudge for mismatched attempt */
  public playGentleNudge() {
    this.playTone(329.63, 0.22, 'triangle', 0.03, 0);
    this.playTone(293.66, 0.3, 'triangle', 0.025, 0.1);
  }

  /** Soft wooden resonance when sliding drawers, ladder, or bookend */
  public playWoodSlide() {
    this.playTone(165, 0.14, 'triangle', 0.04, 0);
    this.playTone(210, 0.11, 'sine', 0.025, 0.05);
  }

  /** Crisp brass latch click when inspecting plaques or curios */
  public playBrassClick() {
    this.playTone(880, 0.09, 'triangle', 0.03, 0);
    this.playTone(1174.66, 0.14, 'sine', 0.02, 0.03);
  }

  /** Playable Victorian piano key tone (or cracked dissonant string) */
  public playPianoKey(freq: number, cracked = false) {
    if (cracked) {
      this.playTone(freq, 0.35, 'sawtooth', 0.035, 0);
      this.playTone(freq * 0.94, 0.4, 'triangle', 0.04, 0.02);
      return;
    }
    this.playTone(freq, 0.65, 'sine', 0.055, 0);
    this.playTone(freq * 2, 0.32, 'triangle', 0.015, 0.01);
  }

  /** Glass dropper water plink for Spring greenhouse */
  public playWaterDrop(clear = true) {
    if (clear) {
      this.playTone(740, 0.12, 'sine', 0.04, 0);
      this.playTone(1108.73, 0.18, 'sine', 0.03, 0.05);
    } else {
      this.playTone(230, 0.18, 'triangle', 0.04, 0);
      this.playTone(190, 0.22, 'sine', 0.03, 0.06);
    }
  }

  /** Brass memory balance scale tilt feedback */
  public playScaleCreak(overweight: boolean) {
    if (overweight) {
      this.playTone(155, 0.24, 'triangle', 0.045, 0);
      this.playTone(130, 0.3, 'sine', 0.04, 0.08);
    } else {
      this.playTone(392, 0.16, 'sine', 0.03, 0);
      this.playTone(523.25, 0.22, 'sine', 0.025, 0.05);
    }
  }

  /** Mechanical pocket-watch escapement tick (or frozen crystal lock) */
  public playClockTick(frozen = false) {
    if (frozen) {
      this.playTone(1480, 0.14, 'triangle', 0.025, 0);
      this.playTone(195, 0.16, 'sine', 0.03, 0.04);
      return;
    }
    this.playTone(1046.5, 0.045, 'triangle', 0.04, 0);
    this.playTone(880, 0.045, 'triangle', 0.035, 0.18);
  }

  /** Heavy crimson wax seal press thump */
  public playWaxSealStamp() {
    this.playTone(145, 0.16, 'triangle', 0.055, 0);
    this.playTone(290, 0.18, 'sine', 0.03, 0.03);
  }

  /** Crisp aged parchment snap when flipping a 3:4 tarot card */
  public playCardFlip() {
    this.playTone(420, 0.06, 'triangle', 0.035, 0);
    this.playTone(680, 0.08, 'sine', 0.025, 0.025);
  }

  /** Chain reaction shockwave when a trap card unseats or frost-locks adjacent slots */
  public playCardChainShock() {
    this.playTone(215, 0.24, 'sawtooth', 0.028, 0);
    this.playTone(155, 0.3, 'triangle', 0.04, 0.05);
  }
}

export const libraryAudio = new DreamLibraryAudio();
