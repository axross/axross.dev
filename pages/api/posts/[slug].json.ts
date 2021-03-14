import type { NextApiHandler } from "next";
import { getLocaleFromQueryWithFallback } from "../../../helpers/i18n";
import { getPostJson } from "../../../services/cms-json";

const handler: NextApiHandler = async (req, res) => {
  const locale = getLocaleFromQueryWithFallback(req.query);
  const json = await getPostJson({ slug: `${req.query.slug}`, locale });

  if (json === null) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.setHeader(
    "cache-control",
    "max-age=60, stale-while-revalidate=3600, public"
  );
  res.json(json);
};

export default handler;
