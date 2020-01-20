import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler({ httpMethod }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (httpMethod !== "GET") {
    return { statusCode: 404, body: "" };
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "text/plain"
    },
    body: `sitemap: ${new URL("/sitemap.xml", process.env.URL)}\n`
  };
}
