import { NextPageContext } from "next";
import { SELF_URL } from "../constant/general";

export default function RobotsTxt() {
  return null;
}

RobotsTxt.getInitialProps = async ({ req, res }: NextPageContext) => {
  if (!req || !res) {
    throw new Error();
  }

  if (req.method !== "GET") {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  res.end(`sitemap: ${new URL("/sitemap.xml", SELF_URL.origin)}\n`);
};
