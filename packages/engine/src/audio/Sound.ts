import type { AudioBus } from "./AudioBus";

export class Sound {
  constructor(private buffer: AudioBuffer, private bus: AudioBus, private targetBus = "sfx") {}

  play(volume = 1) {
    const source = this.bus.getContext().createBufferSource();
    const gain = this.bus.getContext().createGain();
    gain.gain.value = volume;
    source.buffer = this.buffer;
    source.connect(gain);
    gain.connect(this.bus.getBus(this.targetBus));
    source.start();
  }
}
