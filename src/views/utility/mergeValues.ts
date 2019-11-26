export default function mergeValues<T>(
  primary: T | undefined,
  secondary: T | undefined,
  fallback: T
): T {
  if (primary !== undefined) {
    return primary;
  }

  if (secondary !== undefined) {
    return secondary;
  }

  return fallback;
}
