import { APIGatewayProxyCallback, APIGatewayProxyEvent } from "aws-lambda";
import ScrapingWebpageSummaryRepository from "./repositories/ScrapingWebpageSummaryRepository";

export function handler(
  event: APIGatewayProxyEvent,
  _: any,
  callback: APIGatewayProxyCallback
): void {
  const { httpMethod, queryStringParameters } = event;

  if (httpMethod !== "GET") {
    callback(null, { statusCode: 404, body: "" });

    return;
  }

  const url = queryStringParameters?.url;

  if (!url) {
    callback(null, { statusCode: 400, body: "the url must be given." });

    return;
  }

  new ScrapingWebpageSummaryRepository()
    .getByURL(new URL(url))
    .then(webpageSummary => callback(null, {
      statusCode: 200,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(webpageSummary),
    }))
    .catch(err => callback(null, {
      statusCode: 404,
      body: err.message,
    }));
}
