export async function getIntlMessages({
  locale,
}: {
  locale: string;
}): Promise<Record<string, any>> {
  const response = await fetch(
    `https://cdn.simplelocalize.io/${process.env.NEXT_PUBLIC_SIMPLE_LOCALIZE_TOKEN}/_latest/${locale}`
  );
  const json = await response.json();

  return json;
}
