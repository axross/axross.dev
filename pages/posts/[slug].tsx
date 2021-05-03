import Negotiator from "negotiator";
import { GetServerSideProps, NextPage } from "next";
import { getDefaultLocale, getLocales } from "../../helpers/localization";

const Page: NextPage = () => null;

export const getServerSideProps: GetServerSideProps<
  {},
  { slug: string }
> = async ({ req, params }) => {
  if (req.url?.includes("?")) {
    const searchParams = new URL(req.url, process.env.NEXT_PUBLIC_SELF_ORIGIN)
      .searchParams;
    const requestedLocale = getLocales().find(
      (locale) => locale === searchParams.get("hl")?.toLowerCase()
    );

    return {
      redirect: {
        permanent: true,
        destination: `/${requestedLocale}/posts/${params!.slug}`,
      },
    };
  }

  const negotiator = new Negotiator(req);
  const locale = negotiator.language(getLocales()) ?? getDefaultLocale();

  return {
    redirect: {
      permanent: true,
      destination: `/${locale}/posts/${params!.slug}`,
    },
  };
};

export default Page;
