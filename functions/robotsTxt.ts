import { APIGatewayProxyCallback, APIGatewayProxyEvent } from "aws-lambda";

export default function handler(
  event: APIGatewayProxyEvent,
  _: any,
  callback: APIGatewayProxyCallback
): void {
  const { httpMethod } = event;

  if (httpMethod !== "GET") {
    callback(null, { statusCode: 404, body: "" });

    return;
  }

  callback(null, {
    statusCode: 200,
    headers: {
      "content-type": "text/plain"
    },
    body: `sitemap: ${new URL("/sitemap.xml", process.env.DEPLOY_PRIME_URL)}\n`
  });
}
