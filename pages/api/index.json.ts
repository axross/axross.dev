import type { NextApiHandler } from "next";
import { getIndexPageJson } from "../../adapters/cms";
import { getLocaleFromQueryWithFallback } from "../../helpers/i18n";

const handler: NextApiHandler = async (req, res) => {
  const locale = getLocaleFromQueryWithFallback(req.query);
  const json = await getIndexPageJson({ locale });

  if (json === null) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.json(json);
};

export default handler;
