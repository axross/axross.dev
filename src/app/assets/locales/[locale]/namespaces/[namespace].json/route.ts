import { type NextRequest, NextResponse } from "next/server";

async function getDictionary({
  locale,
  namespace,
}: {
  locale: string;
  namespace: string;
}): Promise<Record<string, string>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const module = await import(
    `../../../../../../locales/${locale}/${namespace}.json`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return module.default as never;
}

interface RouteParams {
  locale: string;
  namespace: string;
}

async function GET(
  request: NextRequest,
  { params: { locale, namespace } }: { params: RouteParams },
): Promise<Response> {
  const dictionary = await getDictionary({ locale, namespace });

  return NextResponse.json(dictionary, { status: 200 });
}

export { GET };
