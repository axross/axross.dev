import Negotiator from "negotiator";
import { GetServerSideProps, NextPage } from "next";
import { getDefaultLocale, getLocales } from "../../helpers/localization";

const Page: NextPage = () => null;

export const getServerSideProps: GetServerSideProps<
  {},
  { slug: string }
> = async ({ req, params }) => {
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
