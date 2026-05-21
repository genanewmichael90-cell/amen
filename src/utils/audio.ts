/**
 * Web Audio Ambient Piano Synthesizer for Amen's Birthday Story
 * Plays a beautiful, slow romantic chord progression and random gentle high notes.
 * Fully offline, CORS-safe, and 100% reliable.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private schedulerTimer: number | null = null;
  private chordIndex: number = 0;
  private lastChordTime: number = 0;

  // dbmaj7, bbm9, gbmaj9, absus4 -> ab7 (very romantic, emotional progression in Db major)
  private progressions = [
    { chords: [138.59, 174.61, 207.65, 261.63], name: "Db Major 7 (Deep Devotion)" }, // Db3, F3, Ab3, C4
    { chords: [116.54, 138.59, 164.81, 207.65], name: "Bb Minor 9 (Sweet Silence)" },  // Bb2, Db3, E3, Ab3
    { chords: [92.50, 146.83, 174.61, 220.00],  name: "Gb Major 9 (First Glance)" },  // Gb2, D3, F3, A3
    { chords: [103.83, 155.56, 185.00, 233.08],  name: "Ab Suspended (Yearning Heart)" }, // Ab2, Eb3, F#3, Bb3
  ];

  constructor() {}

  public async start() {
    if (this.isPlaying) return;

    try {
      // Initialize Audio Context on user click
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Master Gain
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.primaryGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 3); // Slow fade-in

      // Sparkle/High Notes Low-pass filter to sound soft and warm
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(850, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1, this.ctx.currentTime);

      // Creative Feedback Delay for lush echoing tail
      this.delayNode = this.ctx.createDelay(2.0);
      this.delayNode.delayTime.setValueAtTime(0.75, this.ctx.currentTime);

      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(0.42, this.ctx.currentTime);

      // Connect standard delay path
      this.delayNode.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode); // feedback loop

      // Route everything
      this.filterNode.connect(this.primaryGain);
      this.delayNode.connect(this.primaryGain);
      
      this.primaryGain.connect(this.ctx.destination);

      this.isPlaying = true;
      this.isMuted = false;
      
      // Start scheduling sound blocks
      this.runSoundEngine();
    } catch (e) {
      console.error("Audio Context initialization failed:", e);
    }
  }

  private runSoundEngine = () => {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Play a slow chord every 5.5 seconds
    if (now - this.lastChordTime > 5.5) {
      this.playRomanticChord(this.progressions[this.chordIndex].chords);
      this.chordIndex = (this.chordIndex + 1) % this.progressions.length;
      this.lastChordTime = now;
    }

    // Occasionally play a high, beautiful, sweet piano-box raindrop note (emotional sparkle)
    if (Math.random() < 0.65) {
      this.playSparkleNote();
    }

    // Schedule next frame check
    this.schedulerTimer = window.setTimeout(this.runSoundEngine, Math.random() * 800 + 400);
  };

  private playRomanticChord(freqs: number[]) {
    if (!this.ctx || !this.filterNode) return;

    const now = this.ctx.currentTime;
    const duration = 5.2;

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.filterNode) return;
      
      // Create oscillator for each voice in the chord
      const osc = this.ctx.createOscillator();
      const voiceGain = this.ctx.createGain();

      // Soft triangle waves mimic a warm physical piano board
      osc.type = "triangle";
      
      // Detune slightly to create thick backplane warmth
      osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);
      
      // Slow attack (0.6s) and long release profile (4.5s)
      voiceGain.gain.setValueAtTime(0, now);
      voiceGain.gain.linearRampToValueAtTime(0.06 - (idx * 0.008), now + 0.8 + (Math.random() * 0.3));
      voiceGain.gain.setValueAtTime(0.06 - (idx * 0.008), now + duration - 1.2);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(voiceGain);
      voiceGain.connect(this.filterNode);
      
      // Also route soft stereo delay
      if (idx % 2 === 0 && this.delayNode) {
        voiceGain.connect(this.delayNode);
      }

      osc.start(now);
      osc.stop(now + duration + 0.5);
    });
  }

  private playSparkleNote() {
    if (!this.ctx || !this.filterNode || !this.delayNode) return;

    const now = this.ctx.currentTime;
    
    // Pick a pentatonic/maj7 high sparkling note in Db (between 600 - 1500 Hz)
    const scale = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51, 1396.91];
    const freq = scale[Math.floor(Math.random() * scale.length)];
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sine wave sounds like a soft pure bell/raindrop
    osc.type = Math.random() > 0.4 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, now);

    // Dynamic gain values
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.08); // Sharp pluck attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2); // Sweet resonance

    osc.connect(gain);
    gain.connect(this.filterNode);
    gain.connect(this.delayNode); // Bell sound ring inside feedback echo chamber

    osc.start(now);
    osc.stop(now + 2.5);
  }

  public setVolume(val: number) {
    if (this.primaryGain && this.ctx) {
      this.primaryGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    if (!this.primaryGain || !this.ctx) return false;
    if (this.isMuted) {
      this.primaryGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.isMuted = false;
    } else {
      this.primaryGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.isMuted = true;
    }
    return this.isMuted;
  }

  public getMutedState() {
    return this.isMuted;
  }

  public stop() {
    this.isPlaying = false;
    if (this.schedulerTimer) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const soundscape = new AmbientSoundscape();
