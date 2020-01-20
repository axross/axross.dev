import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ScrapingWebpageSummaryRepository from "./repositories/ScrapingWebpageSummaryRepository";

export async function handler({ httpMethod, queryStringParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (httpMethod !== "GET") {
    return { statusCode: 404, body: "" };
  }

  const url = queryStringParameters?.url;

  if (!url) {
    return { statusCode: 400, body: "the url must be given." };
  }

  try {
    const webpageSummary = await new ScrapingWebpageSummaryRepository().getByURL(new URL(url));

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(webpageSummary),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.message,
    };
  }
}
