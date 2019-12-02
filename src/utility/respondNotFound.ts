import { NextPageContext } from "next";

export default function respondNotFound(context: NextPageContext) {
  if (context.res) {
    context.res.writeHead(404).end();
  } else {
    // 404?
  }
}
