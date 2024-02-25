const oneByte = 16;
const hexDigitsForByte = 2;

async function hash(value: string): Promise<string> {
  const input = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-1", input);

  let hashedHex = "";

  for (const byte of new Uint8Array(digest)) {
    hashedHex += byte.toString(oneByte).padStart(hexDigitsForByte, "0");
  }

  return hashedHex;
}

export { hash };
