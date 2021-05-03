import Negotiator from "negotiator";
import { GetServerSideProps, NextPage } from "next";
import { getDefaultLocale, getLocales } from "../helpers/localization";

const Page: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const negotiator = new Negotiator(req);
  const locale = negotiator.language(getLocales()) ?? getDefaultLocale();

  return {
    redirect: {
      permanent: true,
      destination: `/${locale}`,
    },
  };
};

export default Page;
