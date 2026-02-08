export type ComponentType<T> = {
  name: string;
};

export type ComponentStore<T> = Map<number, T>;

export const createComponent = <T>(name: string): ComponentType<T> => ({ name });
