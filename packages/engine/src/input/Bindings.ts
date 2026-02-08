export type Binding = {
  keys?: string[];
  buttons?: number[];
};

export class Bindings {
  private bindings = new Map<string, Binding>();

  bind(action: string, binding: Binding) {
    this.bindings.set(action, binding);
  }

  get(action: string) {
    const binding = this.bindings.get(action);
    if (!binding) {
      throw new Error(`Binding missing: ${action}`);
    }
    return binding;
  }
}
