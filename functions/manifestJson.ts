import { APIGatewayProxyCallback, APIGatewayProxyEvent } from "aws-lambda";
import * as Contentful from 'contentful';
import { DARK_COLOR } from "../common/constant/color";
import { ContentfulLocaleRepository } from "../common/repositories/LocaleRepository";
import ThemedColor from "../common/types/ThemedColor";

export default function handler(
  event: APIGatewayProxyEvent,
  _: any,
  callback: APIGatewayProxyCallback
): void {
  const { httpMethod, queryStringParameters } = event;

  if (httpMethod !== "GET") {
    callback(null, { statusCode: 404, body: "" });

    return;
  }

  const currentLocale = queryStringParameters?.hl ?? null;
  const contentful = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const localeRepository = new ContentfulLocaleRepository(contentful);

  localeRepository.getAllAvailableOnes().then(availableLocales => {
    if (currentLocale === null || !availableLocales.includes(currentLocale)) {
      callback(null, { statusCode: 404, body: "" });

      return;
    }

    callback(null, {
      statusCode: 200,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "short_name": "Kohei",
        "name": "kohei.dev",
        "icons": [
          {
            "src": "/icons@192px.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/icons@512px.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
        "start_url": `/?hl=${currentLocale}`,
        "background_color": DARK_COLOR[ThemedColor.background],
        "display": "browser",
        "scope": "/",
        "theme_color": DARK_COLOR[ThemedColor.background],
      }),
    });
  });
}
