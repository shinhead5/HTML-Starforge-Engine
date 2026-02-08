import type { AudioBus } from "./AudioBus";

export class Music {
  private source: AudioBufferSourceNode | null = null;

  constructor(private buffer: AudioBuffer, private bus: AudioBus) {}

  play(loop = true) {
    this.stop();
    const source = this.bus.getContext().createBufferSource();
    source.buffer = this.buffer;
    source.loop = loop;
    source.connect(this.bus.getBus("music"));
    source.start();
    this.source = source;
  }

  stop() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = null;
    }
  }
}
