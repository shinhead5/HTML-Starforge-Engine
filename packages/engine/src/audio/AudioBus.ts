export class AudioBus {
  private master: GainNode;
  private buses = new Map<string, GainNode>();

  constructor(private context: AudioContext = new AudioContext()) {
    this.master = this.context.createGain();
    this.master.connect(this.context.destination);
    this.createBus("music", 0.8);
    this.createBus("sfx", 1);
  }

  getContext() {
    return this.context;
  }

  createBus(name: string, volume = 1) {
    const gain = this.context.createGain();
    gain.gain.value = volume;
    gain.connect(this.master);
    this.buses.set(name, gain);
  }

  getBus(name: string) {
    const bus = this.buses.get(name);
    if (!bus) {
      throw new Error(`Audio bus missing: ${name}`);
    }
    return bus;
  }

  setMasterVolume(value: number) {
    this.master.gain.value = value;
  }

  mute() {
    this.master.gain.value = 0;
  }

  fade(bus: string, target: number, duration: number) {
    const node = this.getBus(bus);
    node.gain.cancelScheduledValues(this.context.currentTime);
    node.gain.linearRampToValueAtTime(target, this.context.currentTime + duration);
  }
}
