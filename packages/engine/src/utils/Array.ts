export type NonEmptyArray<T> = [T, ...T[]];

export const at = <T>(arr: T[], index: number): T | undefined => {
  if (index < 0 || index >= arr.length) {
    return undefined;
  }
  return arr[index];
};

export const atOr = <T>(arr: T[], index: number, fallback: T): T => {
  const value = at(arr, index);
  return value ?? fallback;
};
