export function isDevelopment(): boolean {
  return /^http:\/\/localhost:[0-9]{1,5}$/.test(
    process.env.NEXT_PUBLIC_SELF_ORIGIN!
  );
}
