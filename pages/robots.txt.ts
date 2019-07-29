import { NextPageContext } from "next";
import getOriginIsomorphicly from "../utility/getOriginIsomorphicly";

function RobotsTxt() {
  return null;
}

RobotsTxt.getInitialProps = async ({
  req,
  res
}: NextPageContext): Promise<any> => {
  const origin = getOriginIsomorphicly(req);

  res!.setHeader("content-type", "text/plain");
  res!.write(`Sitemap: ${origin}/sitemap.xml\n`);
  res!.end();

  return;
};

export default RobotsTxt;
