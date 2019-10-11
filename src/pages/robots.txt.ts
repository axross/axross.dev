import { NextPageContext } from "next";

function RobotsTxt() {
  return null;
}

RobotsTxt.getInitialProps = async ({ res }: NextPageContext): Promise<any> => {
  res!.setHeader("content-type", "text/plain");
  res!.write(`Sitemap: ${process.env.ORIGIN}/sitemap.xml\n`);
  res!.end();

  return;
};

export default RobotsTxt;
