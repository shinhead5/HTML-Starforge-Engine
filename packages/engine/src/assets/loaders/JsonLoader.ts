export class JsonLoader {
  async load<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${src}`);
    }
    return (await response.json()) as T;
  }
}
