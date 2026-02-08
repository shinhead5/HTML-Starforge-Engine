export class AudioLoader {
  constructor(private context: AudioContext) {}

  async load(src: string): Promise<AudioBuffer> {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`Failed to load audio: ${src}`);
    }
    const buffer = await response.arrayBuffer();
    return this.context.decodeAudioData(buffer);
  }
}
