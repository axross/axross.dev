import { NextPageContext } from "next";
import Router from "next/router";

export default function respondRedirection(to: URL, context: NextPageContext) {
  if (context.res) {
    context.res.writeHead(302, { location: to.pathname + to.search }).end();
  } else {
    Router.push(to.pathname + to.search);
  }
}
